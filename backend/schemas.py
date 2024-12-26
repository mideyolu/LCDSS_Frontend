from pydantic import BaseModel
from typing import Optional

class ProviderCreate(BaseModel):
    provider_username: str
    provider_email: str
    provider_password: str

class ProviderLogin(BaseModel):
    provider_email: str
    provider_password: str

class ProviderOut(BaseModel):
    provider_id: int
    provider_username: str


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        orm_mode = True
