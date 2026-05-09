from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    documents = relationship(
        "DocumentDB",
        back_populates="owner",
        cascade="all, delete-orphan",
    )


class DocumentDB(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    content_type = Column(String, nullable=True)

    extracted_text = Column(Text, nullable=True)
    processing_status = Column(String, default="uploaded", nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    owner = relationship(
        "UserDB",
        back_populates="documents",
    )

    chunks = relationship(
        "DocumentChunkDB",
        back_populates="document",
        cascade="all, delete-orphan",
    )


class DocumentChunkDB(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)

    document_id = Column(
        Integer,
        ForeignKey("documents.id"),
        nullable=False,
        index=True,
    )

    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)

    embedding = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    document = relationship(
        "DocumentDB",
        back_populates="chunks",
    )