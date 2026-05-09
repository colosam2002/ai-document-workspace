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

class DocumentChunkResponse(BaseModel):
    id: int
    document_id: int
    chunk_index: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

class DocumentSearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    top_k: int = Field(default=5, ge=1, le=10)


class DocumentSearchResult(BaseModel):
    chunk_id: int
    document_id: int
    filename: str
    chunk_index: int
    content: str
    score: float


class DocumentSearchResponse(BaseModel):
    results: list[DocumentSearchResult]