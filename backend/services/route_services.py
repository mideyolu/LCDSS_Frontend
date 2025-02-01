from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException, UploadFile
from models import Provider, Patient, Diagnosis, Log
from schemas import (
    ProviderCreate, ProviderLogin, ProviderDashboardStats,
    PatientData, LogData, ChartAnalytics, PatientCreate, DiagnosisCreate
)
from utils import create_access_token, create_log, verify_password, get_password_hash, get_count, get_record
import tensorflow as tf
from PIL import Image
from io import BytesIO
import numpy as np

# Load the pre-trained TensorFlow model once
model_path = 'models/Ismail-Lung-Model.tflite'
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

# Get input and output tensor details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Categories for model predictions
categories = ['Benign cases', 'Malignant cases', 'Normal cases']
unit_size = 256


# Authentication Services
async def signup_service(provider: ProviderCreate, db: AsyncSession):
    existing_user = await get_record(db, Provider, provider_email=provider.provider_email)

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(provider.provider_password)
    new_provider = Provider(
        provider_username=provider.provider_username,
        provider_email=provider.provider_email,
        provider_password=hashed_password
    )

    db.add(new_provider)
    await db.commit()
    await db.refresh(new_provider)

    await create_log(action="Provider signup", provider_id=new_provider.provider_id, db=db)

    token = create_access_token(data={"sub": new_provider.provider_email})
    return {"access_token": token, "token_type": "bearer"}

async def login_service(provider: ProviderLogin, db: AsyncSession):
    user = await get_record(db, Provider, provider_email=provider.provider_email)

    if user is None or not verify_password(provider.provider_password, user.provider_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    await create_log(action="Provider login", provider_id=user.provider_id, db=db)

    token = create_access_token(data={"sub": user.provider_email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "provider_id": user.provider_id,
        "provider_username": user.provider_username,
        "provider_email": user.provider_email,
    }

# Image Detection Service
async def detect_service(file: UploadFile, provider_id: int):
    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    try:
        content = await file.read()
        image = Image.open(BytesIO(content)).convert('L').resize((unit_size, unit_size))
        input_data = np.expand_dims(np.array(image) / 255.0, axis=(0, -1)).astype(np.float32)

        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])
        prediction = np.argmax(output_data, axis=-1)[0]

        return {"predicted_category": categories[prediction]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image or predicting: {str(e)}")

# Diagnosis & Patient Services
async def register_diagnosis(provider_id: int, diagnosis_data: DiagnosisCreate, db: AsyncSession):
    user = await get_record(db, Patient, patient_id=diagnosis_data.patient_id)

    if not user:
        raise HTTPException(status_code=400, detail="Patient not found")

    new_diagnosis = Diagnosis(
        provider_id=provider_id,
        patient_id=diagnosis_data.patient_id,
        prediction=diagnosis_data.prediction,
    )

    db.add(new_diagnosis)
    await db.commit()
    await db.refresh(new_diagnosis)

    await create_log(action=f"Registered Diagnosis for {user.patient_name}", provider_id=provider_id, db=db)

    return {"message": "Diagnosis registered successfully"}

async def register_patient_service(patient_data: PatientCreate, db: AsyncSession, provider_id: int):
    existing_user = await get_record(db, Patient, patient_email=patient_data.patient_email)

    if existing_user:
        raise HTTPException(status_code=400, detail="Patient Email already registered")

    new_patient = Patient(
        provider_id=provider_id,
        patient_name=patient_data.patient_name,
        patient_age=patient_data.patient_age,
        patient_gender=patient_data.patient_gender,
        patient_email=patient_data.patient_email,
        patient_notes=patient_data.patient_notes,
    )

    db.add(new_patient)
    await db.commit()
    await db.refresh(new_patient)

    await create_log(action=f"Registered Patient: {patient_data.patient_name}", provider_id=provider_id, db=db)

    return {"message": "Successful", "patient_id": new_patient.patient_id}

# Dashboard & Analytics Services
async def get_dashboard_data(provider_id: int, db: AsyncSession):
    total_patients = await get_count(db, Patient, provider_id=provider_id)

    counts = {
        prediction: await get_count(db, Diagnosis, provider_id=provider_id, prediction=prediction)
        for prediction in categories
    }

    return ProviderDashboardStats(
        total_patients=total_patients,
        benign_cases=counts["Benign cases"],
        malignant_cases=counts["Malignant cases"],
        normal_cases=counts["Normal cases"],
    )

async def get_patients_data(provider_id: int, db: AsyncSession):
    query = (
        select(
            Patient.patient_name,
            Patient.patient_age,
            Patient.patient_gender,
            Patient.patient_email,
            Patient.patient_notes,
            Diagnosis.prediction
        )
        .join(Diagnosis, Patient.patient_id == Diagnosis.patient_id)
        .where(Patient.provider_id == provider_id)
    )
    results = await db.execute(query)
    patient_data = results.fetchall()

    return [
        PatientData(
            patient_name=row.patient_name,
            patient_age=row.patient_age,
            patient_gender=row.patient_gender,
            patient_email=row.patient_email,
            patient_notes=row.patient_notes,
            prediction=row.prediction,
        )
        for row in patient_data
    ]

async def get_chart_data(provider_id: int, db: AsyncSession):
    genders = ["Male", "Female"]
    gender_counts = {gender: await get_count(db, Patient, provider_id=provider_id, patient_gender=gender) for gender in genders}

    diagnosis_counts = {prediction: await get_count(db, Diagnosis, provider_id=provider_id, prediction=prediction) for prediction in categories}

    return ChartAnalytics(
        total_male=gender_counts["Male"],
        total_female=gender_counts["Female"],
        total_normal=diagnosis_counts["Normal cases"],
        total_benign=diagnosis_counts["Benign cases"],
        total_malignant=diagnosis_counts["Malignant cases"]
    )

async def get_provider_log(provider_id: int, db: AsyncSession):
    query_log = (
        select(Log.action, Log.created_at)
        .where(Log.provider_id == provider_id)
        .order_by(Log.created_at.desc())
        .limit(5)
    )
    log_details = await db.execute(query_log)
    logs = log_details.fetchall()

    return [
        LogData(total_log=5, action=log.action, created_at=log.created_at) if logs else LogData(total_log=5, action="No logs available", created_at=None)
        for log in logs
    ]
