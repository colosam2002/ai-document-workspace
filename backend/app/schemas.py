from datetime import datetime
from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=6, max_length=100)


class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str

class DocumentResponse(BaseModel):
    id: int
    filename: str
    content_type: str | None
    processing_status: str
    created_at: datetime

    class Config:
        from_attributes = True

class DocumentDetailResponse(BaseModel):
    id: int
    filename: str
    content_type: str | None
    processing_status: str
    extracted_text: str | None
    created_at: datetime

    class Config:
        from_attributes = True