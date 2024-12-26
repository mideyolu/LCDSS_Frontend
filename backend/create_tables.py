from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from config import settings
from models import Provider, Patient, Diagnosis, Log

# Define the AsyncEngine
DATABASE_URL = settings.DATABASE_URL
engine = create_async_engine(DATABASE_URL, echo=True)

async def create_tables():
    async with engine.begin() as conn:
        # Drop all tables
        await conn.run_sync(SQLModel.metadata.drop_all)
        print("Dropped all tables.")

        # Create all tables
        await conn.run_sync(SQLModel.metadata.create_all)
        print("Created all tables.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(create_tables())
