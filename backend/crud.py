from passlib.context import CryptContext
import models, schemas
from fastapi import HTTPException
from database import database
from sqlalchemy.future import select
from database import SessionLocal
from models import Log
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

# Password hashing utility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Utility function to hash a password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

async def create_provider(provider: schemas.ProviderCreate, db: AsyncSession):
    # Begin the transaction asynchronously
    async with db.begin():
        # Check if the username or email already exists in the database
        result = await db.execute(
            select(models.Provider).filter(
                (models.Provider.provider_username == provider.provider_username) |
                (models.Provider.provider_email == provider.provider_email)
            )
        )

        # Fetch the first result, if any exists
        existing_provider = result.scalar_one_or_none()
        if existing_provider:
            raise HTTPException(status_code=400, detail="Username or email already exists")

        # Hash the password using the utility function
        hashed_password = hash_password(provider.provider_password)

        # Create a new provider object to be saved
        db_provider = models.Provider(
            provider_username=provider.provider_username,
            provider_email=provider.provider_email,
            provider_password=hashed_password
        )

        # Add the provider object to the session
        db.add(db_provider)

    # Commit the transaction to save the provider
    await db.commit()

    # Refresh the instance to load any generated attributes (like the ID)
    await db.refresh(db_provider)

    # Return the newly created provider
    return db_provider


async def get_provider_by_email(email: str, db: AsyncSession):
    # Query the provider using the db session
    result = await db.execute(select(models.Provider).filter(models.Provider.provider_email == email))
    provider = result.scalar_one_or_none()
    return provider


async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def create_log(action: str, provider_id: int = None):
    """
    Create a log entry in the Log table.

    :param action: The action to be logged.
    :param provider_id: The provider ID associated with the event (optional).
    """
    async with SessionLocal() as session:  # Use SessionLocal for database interaction
        async with session.begin():  # Start a transaction
            log_entry = Log(
                action=action,
                provider_id=provider_id,
                created_at=datetime.utcnow().isoformat()
            )
            session.add(log_entry)
            await session.commit()  # Commit the transaction
