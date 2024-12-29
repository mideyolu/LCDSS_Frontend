#### app/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from sqlalchemy import select, func
from models import Provider, Patient, Diagnosis, Log
from schemas import ProviderCreate, ProviderLogin, Token, DiagnosisCreate, PatientCreate, LoginToken, ProviderDashboardStats, PatientData, LogData
from utils import create_access_token, create_log, get_current_provider
from database import get_db
from passlib.context import CryptContext
import tensorflow as tf
from PIL import Image
from io import BytesIO
import numpy as np
from typing import List

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load the pre-trained TensorFlow model once
model = tf.keras.models.load_model('Ismail-Lung-Model.h5')

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
        "provider_username": user.provider_username
    }
    return response

# **Detect Route**
@router.post("/detect")
async def detect(file: UploadFile,db: AsyncSession = Depends(get_db),provider_id: int = Depends(get_current_provider)):

    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    try:
        content = await file.read()

        # Convert the image to grayscale
        image = Image.open(BytesIO(content)).convert('L').resize((unit_size, unit_size))

        # Convert to numpy array and normalize (scaling to [0, 1])
        image = np.array(image) / 255.0

        # Add the batch dimension and channel dimension (1 channel for grayscale)
        image = np.expand_dims(image, axis=-1)  # Shape becomes (256, 256, 1)
        image = np.expand_dims(image, axis=0)   # Shape becomes (1, 256, 256, 1)

        # Make predictions
        predictions = model.predict(image)
        prediction = np.argmax(predictions, axis=-1)[0]

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

@router.get("/chart_data")
async def get_chart_data(    db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    pass

@router.get("/provider_log", response_model=LogData)
async def get_provider_log(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):

    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")


    try:
        # Fetch the total count of log
        query = select(func.count()).select_from(Log).where(Log.provider_id == provider_id)
        log_count = await db.execute(query)
        total_log = log_count.scalar() or 0

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve log data for {provider_id}: {str(e)}")


    pass
