from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import auth
import schemas
from schemas import ProviderOut, ProviderLogin, ProviderCreate, Token
from database import get_db
from crud import create_log, create_provider

router = APIRouter()

# **Signup Route**
@router.post("/signup", response_model=ProviderCreate)
async def signup(provider: schemas.ProviderCreate, db: AsyncSession = Depends(get_db)):
    new_provider = await create_provider(provider, db)

    # Log the signup event
    await create_log(action="Provider signed up", provider_id=new_provider.provider_id)

    return new_provider


# **Login Route (Asynchronous)**
@router.post("/login", response_model=Token)
async def login(provider: ProviderLogin, db: AsyncSession = Depends(get_db)):
    # Authenticate the provider (with db)
    db_provider = await auth.authenticate_provider(provider.provider_email, provider.provider_password, db)

    # If authentication fails
    if not db_provider:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create a token after successful login
    access_token = auth.create_access_token(data={"sub": db_provider.provider_id})

    # Log the login event asynchronously
    await create_log(action="Provider logged in", provider_id=db_provider.provider_id)

    return {"access_token": access_token, "token_type": "bearer"}
