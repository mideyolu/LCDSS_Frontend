from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from databases import Database
from config import settings  # Assuming settings are defined in your config

# Define the SQLAlchemy base class to define ORM models
Base = declarative_base()

# Set up the asynchronous database URL (PostgreSQL in this case)
DATABASE_URL = settings.DATABASE_URL  # Example: 'postgresql+asyncpg://user:password@localhost/dbname'

# Create the async engine for communication with the PostgreSQL database
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# Create a sessionmaker for SQLAlchemy, using AsyncSession for asynchronous operations
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Ensures session is not expired after commit
)

# Optional: If you want to use the `databases` package for low-level query handling (e.g., for direct SQL queries)
database = Database(DATABASE_URL)  # `databases` is typically used for direct async database interaction

# Dependency to get a session for your FastAPI routes
async def get_db():
    async with SessionLocal() as db:
        yield db  # Yielding db session for FastAPI's dependency injection
