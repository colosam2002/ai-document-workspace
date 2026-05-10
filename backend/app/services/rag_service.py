import json
import math

from sqlalchemy.orm import Session

from app.models_db import DocumentChunkDB, DocumentDB, UserDB
from app.services.embedding_service import create_embedding
from app.services.ai_service import generate_answer_from_context


def cosine_similarity(vec1: list[float], vec2: list[float]) -> float:
    dot_product = sum(a * b for a, b in zip(vec1, vec2))

    norm_vec1 = math.sqrt(sum(a * a for a in vec1))
    norm_vec2 = math.sqrt(sum(b * b for b in vec2))

    if norm_vec1 == 0 or norm_vec2 == 0:
        return 0.0

    return dot_product / (norm_vec1 * norm_vec2)


def search_relevant_chunks(
    db: Session,
    query: str,
    current_user: UserDB,
    top_k: int = 5,
) -> list[dict]:
    query_embedding = create_embedding(query)

    chunks = (
        db.query(DocumentChunkDB)
        .join(DocumentDB)
        .filter(DocumentDB.owner_id == current_user.id)
        .filter(DocumentChunkDB.embedding.isnot(None))
        .all()
    )

    scored_chunks = []

    for chunk in chunks:
        chunk_embedding = json.loads(chunk.embedding)

        score = cosine_similarity(query_embedding, chunk_embedding)

        scored_chunks.append(
            {
                "chunk_id": chunk.id,
                "document_id": chunk.document_id,
                "filename": chunk.document.filename,
                "chunk_index": chunk.chunk_index,
                "content": chunk.content,
                "score": score,
            }
        )

    scored_chunks.sort(key=lambda item: item["score"], reverse=True)

    return scored_chunks[:top_k]

def build_context_from_chunks(chunks: list[dict]) -> str:
    context_parts = []

    for index, chunk in enumerate(chunks, start=1):
        context_parts.append(
            f"""
Source {index}
Document: {chunk["filename"]}
Chunk index: {chunk["chunk_index"]}
Content:
{chunk["content"]}
"""
        )

    return "\n---\n".join(context_parts)

def answer_question_with_documents(
    db: Session,
    question: str,
    current_user: UserDB,
    top_k: int = 5,
) -> dict:
    relevant_chunks = search_relevant_chunks(
        db=db,
        query=question,
        current_user=current_user,
        top_k=top_k,
    )

    if not relevant_chunks:
        return {
            "answer": "I don't have enough information in your documents to answer that question.",
            "sources": [],
        }

    context = build_context_from_chunks(relevant_chunks)

    answer = generate_answer_from_context(
        question=question,
        context=context,
    )

    return {
        "answer": answer,
        "sources": relevant_chunks,
    }