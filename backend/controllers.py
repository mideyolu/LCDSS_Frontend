#### app/routes/controllers.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from models import Provider, Patient

router = APIRouter()


