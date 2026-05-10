import os
import json

from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.dependencies import get_current_user, get_db
from app.models_db import DocumentDB, DocumentChunkDB, UserDB
from app.schemas import (
    DocumentResponse,
    DocumentDetailResponse,
    DocumentSearchRequest,
    DocumentSearchResponse,
    DocumentChatRequest,
    DocumentChatResponse,
)
from app.services.extraction_service import extract_text
from app.services.chunking_service import split_text_into_chunks
from app.services.embedding_service import create_embedding
from app.services.rag_service import (
    search_relevant_chunks,
    answer_question_with_documents,
)

router = APIRouter(prefix="/documents", tags=["documents"])

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def create_chunks_for_document(
    db: Session,
    document: DocumentDB,
    text: str,
) -> None:
    chunks = split_text_into_chunks(text)

    for index, chunk_content in enumerate(chunks):
        embedding = create_embedding(chunk_content)

        chunk = DocumentChunkDB(
            document_id=document.id,
            chunk_index=index,
            content=chunk_content,
            embedding=json.dumps(embedding),
        )

        db.add(chunk)

@router.post("/upload", response_model=DocumentResponse)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user),
):
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must have a filename",
        )

    unique_filename = f"{uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

        extracted_text = None
        processing_status = "uploaded"

        try:
            extracted_text = extract_text(
                file_path=file_path,
                content_type=file.content_type,
                filename=file.filename,
            )

            if extracted_text:
                processing_status = "processed"
            else:
                processing_status = "failed"

        except Exception as e:
            print(f"[TEXT EXTRACTION ERROR]: {e}")
            processing_status = "failed"

        new_document = DocumentDB(
            filename=file.filename,
            file_path=file_path,
            content_type=file.content_type,
            extracted_text=extracted_text,
            processing_status=processing_status,
            owner_id=current_user.id,
        )

        db.add(new_document)
        db.commit()
        db.refresh(new_document)

        if new_document.processing_status == "processed" and new_document.extracted_text:
            create_chunks_for_document(
                db=db,
                document=new_document,
                text=new_document.extracted_text,
            )

            db.commit()
            db.refresh(new_document)

        return new_document

    except Exception as e:
        print(f"[UPLOAD ERROR]: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error uploading document",
        )
    

@router.post("/search", response_model=DocumentSearchResponse)
def search_documents(
    data: DocumentSearchRequest,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user),
):
    results = search_relevant_chunks(
        db=db,
        query=data.query,
        current_user=current_user,
        top_k=data.top_k,
    )

    return {"results": results}

@router.post("/chat", response_model=DocumentChatResponse)
def chat_with_documents(
    data: DocumentChatRequest,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user),
):
    result = answer_question_with_documents(
        db=db,
        question=data.question,
        current_user=current_user,
        top_k=data.top_k,
    )

    return result

@router.get("", response_model=list[DocumentResponse])
def list_documents(
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user),
):
    documents = (
        db.query(DocumentDB)
        .filter(DocumentDB.owner_id == current_user.id)
        .order_by(DocumentDB.created_at.desc())
        .all()
    )

    return documents

@router.get("/{document_id}", response_model=DocumentDetailResponse)
def get_document_detail(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user),
):
    document = (
        db.query(DocumentDB)
        .filter(
            DocumentDB.id == document_id,
            DocumentDB.owner_id == current_user.id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    return document

@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user),
):
    document = (
        db.query(DocumentDB)
        .filter(
            DocumentDB.id == document_id,
            DocumentDB.owner_id == current_user.id,
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    file_path = document.file_path

    db.delete(document)
    db.commit()

    if file_path and os.path.exists(file_path):
        os.remove(file_path)

    return {"message": "Document deleted successfully"}

