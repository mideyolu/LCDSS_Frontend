from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
import asyncio
import router
from config import settings
from models import Provider, Patient, Diagnosis, Log
from database import database

# Define the AsyncEngine
DATABASE_URL = settings.DATABASE_URL
engine = create_async_engine(DATABASE_URL, echo=True)

# Create the FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from specific origins (for development use)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, change to specific URLs for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include the router
app.include_router(router.router)

# Function to create and drop tables
async def create_tables():
    async with engine.begin() as conn:
        # Drop all tables
       # await conn.run_sync(SQLModel.metadata.drop_all)
        print("Dropped all tables.")

        # Create all tables
        await conn.run_sync(SQLModel.metadata.create_all)
        print("Created all tables.")

# Create the tables when the app starts up
@app.on_event("startup")
async def startup():
    await create_tables()

# **Connect to the Database on Startup**
@app.on_event("startup")
async def startup_db():
    # Connect to the database
    await database.connect()

# **Disconnect from the Database on Shutdown**
@app.on_event("shutdown")
async def shutdown_db():
    # Disconnect from the database
    await database.disconnect()

if __name__ == "__main__":
    import asyncio
    # Running the table creation process
    asyncio.run(create_tables())
