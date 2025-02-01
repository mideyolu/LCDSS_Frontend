#### app/routes/route.py

from fastapi import APIRouter, Depends, UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import ProviderCreate, ProviderLogin, Token, PatientCreate, LoginToken, ProviderDashboardStats, PatientData, LogData, ChartAnalytics, DiagnosisCreate
from utils import  get_current_provider, create_log_safe
from database import get_db
from typing import List
from services.route_services import signup_service, login_service, detect_service, register_patient_service, get_dashboard_data, get_patients_data, get_chart_data, get_provider_log, register_diagnosis

router = APIRouter()

# **Signup Route**
@router.post("/signup", response_model=Token)
async def signup(provider: ProviderCreate, db: AsyncSession = Depends(get_db)):
    return await signup_service(provider, db)

# **Login Route**
@router.post("/login", response_model=LoginToken)
async def login(provider: ProviderLogin, db: AsyncSession = Depends(get_db)):
    return await login_service(provider, db)

# **Detect Route**
@router.post("/detect")
async def detect(file: UploadFile, provider_id: int = Depends(get_current_provider)):
    return await detect_service(file, provider_id)

# **Register Patient Data Route**
@router.post('/patients')
async def register_patient(patient_data: PatientCreate, db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    return await register_patient_service(patient_data, db, provider_id)

# **Register Result Data Route**
@router.post("/results")
async def diagnosis_route(
    diagnosis_data: DiagnosisCreate,
    provider_id: int = Depends(get_current_provider),
    db: AsyncSession = Depends(get_db),
):
    return await register_diagnosis(provider_id, diagnosis_data, db)



# **Get Dashbaord Data Route**
@router.get("/dashboard", response_model=ProviderDashboardStats)
async def dashboard_data(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    return await get_dashboard_data(provider_id, db)

# **Get Patient Data**
@router.get("/patients_data", response_model=List[PatientData])
async def patients_data(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    return await get_patients_data(provider_id, db)

# **Get Chart Data**
@router.get("/chart_data", response_model=ChartAnalytics)
async def chart_data(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    return await get_chart_data(provider_id, db)

# **Get Log Data**
@router.get("/provider_log", response_model=List[LogData])
async def provider_log(db: AsyncSession = Depends(get_db), provider_id: int = Depends(get_current_provider)):
    return await get_provider_log(provider_id, db)


@router.post("/logout")
async def logout(provider_id: int = Depends(get_current_provider), db: AsyncSession = Depends(get_db)):
    if not provider_id:
        raise HTTPException(status_code=401, detail="Invalid provider")

    # Log the logout action
    await create_log_safe(action="Provider logout", provider_id=provider_id, db=db)

    response = {"message": "Successfully logged out"}
    return response
