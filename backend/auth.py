from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import JWTError, jwt
import crud
from crud import get_provider_by_email, verify_password
from config import settings
from sqlalchemy.ext.asyncio import AsyncSession



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def authenticate_provider(email: str, password: str, db: AsyncSession):
    # Use db session to get the provider
    provider = await get_provider_by_email(email, db)  # Pass db to CRUD method

    if not provider or not await verify_password(password, provider.provider_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return provider

async def get_current_provider(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        provider_id: int = payload.get("sub")
        if provider_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return provider_id
