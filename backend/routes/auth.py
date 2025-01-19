#### app/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from sqlalchemy import select, func
from models import Provider, Patient, Diagnosis, Log
from schemas import ProviderCreate, ProviderLogin, Token, DiagnosisCreate, PatientCreate, LoginToken, ProviderDashboardStats, PatientData, LogData, ChartAnalytics
from utils import create_access_token, create_log, get_current_provider
from database import get_db
from passlib.context import CryptContext
import tensorflow as tf
from PIL import Image
from io import BytesIO
import numpy as np
from typing import List

import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load the pre-trained TensorFlow model once
model = 'models/Ismail-Lung-Model.tflite'
interpreter = tf.lite.Interpreter(model_path=model)
interpreter.allocate_tensors()

# Get input and output tensor details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


# Categories for model predictions
categories = ['Benign cases', 'Malignant cases', 'Normal cases']
unit_size=256

# **Signup Route**
@router.post("/signup", response_model=Token)
async def signup(provider: ProviderCreate, db: AsyncSession = Depends(get_db)):
    query = select(Provider).where(Provider.provider_email == provider.provider_email)
    result = await db.execute(query)
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(provider.provider_password)
    new_provider = Provider(
        provider_username=provider.provider_username,
        provider_email=provider.provider_email,provider_password=hashed_password
    )
    db.add(new_provider)
    await db.commit()
    await db.refresh(new_provider)

    await create_log(action="Provider signup", provider_id=new_provider.provider_id, db=db)

    token = create_access_token(data={"sub": new_provider.provider_email})
    return {"access_token": token, "token_type": "bearer"}

# **Login Route**
@router.post("/login", response_model=LoginToken)
async def login(provider: ProviderLogin, db: AsyncSession = Depends(get_db)):
    query = select(Provider).where(Provider.provider_email == provider.provider_email)
    result = await db.execute(query)
    user = result.scalars().first()

    if not user or not pwd_context.verify(provider.provider_password, user.provider_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    await create_log(action="Provider login", provider_id=user.provider_id, db=db)

    token = create_access_token(data={"sub": user.provider_email})

    # Ensure provider_id is included
    response = {
        "access_token": token,
        "token_type": "bearer",
        "provider_id": user.provider_id,
        "provider_username": user.provider_username,
        "provider_email": user.provider_email,
    }
    return response

@router.post("/logout")
async def logout(provider_id: int = Depends(get_current_provider), db: AsyncSession = Depends(get_db)):
    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    # Log the logout action
    await create_log(action="Provider logout", provider_id=provider_id, db=db)

    response = {"message": "Successfully logged out"}
    return response

# **Detect Route**
@router.post("/detect")
async def detect(file: UploadFile, db: AsyncSession = Depends(get_db),provider_id: int = Depends(get_current_provider)):

    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    try:
        # Read and preprocess the image
        content = await file.read()
        image = Image.open(BytesIO(content)).convert('L').resize((unit_size, unit_size))
        input_data = np.expand_dims(np.array(image) / 255.0, axis=(0, -1)).astype(np.float32)

        # Set the input tensor
        interpreter.set_tensor(input_details[0]['index'], input_data)

        # Run inference
        interpreter.invoke()

        # Get the output tensor
        output_data = interpreter.get_tensor(output_details[0]['index'])
        prediction = np.argmax(output_data, axis=-1)[0]

        # Return the predicted category
        category = categories[prediction]
        return {"predicted_category": category}

    except Exception as e:
        # Log and return an error if something goes wrong
        print(f"Error processing image or predicting: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing image or predicting")


# **Register Patient Route**
@router.post('/patients')
async def register_patient(
patient_data: PatientCreate, db: AsyncSession = Depends(get_db),provider_id: int = Depends(get_current_provider)):
    query = select(Patient).where(Patient.patient_email == patient_data.patient_email)
    result = await db.execute(query)
    existing_user = result.scalars().first()

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

# **Register Diagnosis Route**
@router.post("/results")
async def register_diagnosis(
    diagnosis_data: DiagnosisCreate,
    provider_id: int = Depends(get_current_provider),
    db: AsyncSession = Depends(get_db),
):

    new_diagnosis = Diagnosis(
        provider_id=provider_id,  # Use the provider_id from the token
        patient_id=diagnosis_data.patient_id,
        prediction=diagnosis_data.prediction,
    )

    query = select(Patient).where(Patient.patient_id == diagnosis_data.patient_id)
    result = await db.execute(query)
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=400, detail="Patient not found")

    db.add(new_diagnosis)
    await db.commit()
    await db.refresh(new_diagnosis)


    await create_log(action=f"Registered Diagnosis for {user.patient_name}", provider_id=provider_id, db=db)

    return {"message": "Diagnosis registered successfully"}

# **Get Dashbaord Data**
@router.get("/dashboard", response_model=ProviderDashboardStats)
async def get_dashboard_data(
    db: AsyncSession = Depends(get_db),
    provider_id: int = Depends(get_current_provider)
):
    try:
        # Fetch the total count of patients
        query = select(func.count()).select_from(Patient).where(Patient.provider_id == provider_id)
        patient_count = await db.execute(query)
        total_patients = patient_count.scalar() or 0

        # Define predictions to count
        predictions = ["Normal cases", "Benign cases", "Malignant cases"]
        counts = {}

        # Fetch counts for each prediction type
        for prediction in predictions:
            stmt = select(func.count()).select_from(Diagnosis).where(
                Diagnosis.provider_id == provider_id,
                Diagnosis.prediction == prediction,
            )
            result = await db.execute(stmt)
            counts[prediction] = result.scalar() or 0

        # Assign counts
        normal_cases = counts.get("Normal cases", 0)
        benign_cases = counts.get("Benign cases", 0)
        malignant_cases = counts.get("Malignant cases", 0)

        # Return structured statistics
        stats = ProviderDashboardStats(
            total_patients=total_patients,
            benign_cases=benign_cases,
            malignant_cases=malignant_cases,
            normal_cases=normal_cases,
        )
        return stats

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve dashboard data: {str(e)}")

# **Get Patient Data**
@router.get("/patients_data", response_model=List[PatientData])
async def get_patients_data(
    db: AsyncSession = Depends(get_db),
    provider_id: int = Depends(get_current_provider)
):

    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    try:
        # Fetch patients with their diagnosis using a join
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

        # Map data to the PatientData schema
        response_data = [
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

        return response_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve patient data: {str(e)}")

# **Get Chart Data**
@router.get("/chart_data", response_model=ChartAnalytics)
async def get_chart_data(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):

    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    try:
        # Fetch the total count of patients
        genders = ["Male", "Female"]
        counts = {}

        # Fetch counts for each gender category
        for gender in genders:
            stmt = select(func.count()).select_from(Patient).where(
                Patient.provider_id == provider_id,
                Patient.patient_gender == gender,
            )
            result = await db.execute(stmt)
            counts[gender] = result.scalar() or 0

        # Assign counts
        male_count = counts.get("Male", 0)
        female_count = counts.get("Female", 0)


        # Define predictions to count
        predictions = ["Normal cases", "Benign cases", "Malignant cases"]
        counts = {}

        # Fetch counts for each prediction type
        for prediction in predictions:
            stmt = select(func.count()).select_from(Diagnosis).where(
                Diagnosis.provider_id == provider_id,
                Diagnosis.prediction == prediction,
            )
            result = await db.execute(stmt)
            counts[prediction] = result.scalar() or 0

        # Assign counts
        normal_cases = counts.get("Normal cases", 0)
        benign_cases = counts.get("Benign cases", 0)
        malignant_cases = counts.get("Malignant cases", 0)

        # Return structured statistics
        stats = ChartAnalytics(
            total_male=male_count,
            total_female=female_count,
            total_normal=normal_cases,
            total_benign=benign_cases,
            total_malignant=malignant_cases
        )
        return stats

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve stats data: {str(e)}")


# **Get Provider Log Data**
@router.get("/provider_log", response_model=List[LogData])
async def get_provider_log(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    try:
        # Set total_log to 5 directly for testing purposes
        total_log = 5

        # Fetch the latest 5 log details (action and created_at) for the provider
        query_log = (
            select(Log.action, Log.created_at)
            .where(Log.provider_id == provider_id)
            .order_by(Log.created_at.desc())
            .limit(5)  # Limit the results to 5 logs
        )
        log_details = await db.execute(query_log)
        logs = log_details.fetchall()  # Fetch all 5 logs

        # If no logs are found, return defaults
        if not logs:
            return [
                LogData(total_log=total_log, action="No logs available", created_at=None)
            ]

        # Prepare the response data
        log_data_list = [
            LogData(total_log=total_log, action=log.action, created_at=log.created_at)
            for log in logs
        ]

        # Return the list of logs
        return log_data_list

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve log data for {provider_id}: {str(e)}")
