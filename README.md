# AI Document Workspace

Full-stack AI workspace to upload documents, search knowledge, and chat with files using RAG.

## Current Status

First git push:

- FastAPI backend
- React frontend
- PostgreSQL connection
- User registration
- JWT login
- Protected dashboard
- Logout flow

Second git push:

- User authentication
- Protected dashboard
- Document upload from frontend
- Document metadata stored in PostgreSQL
- Uploaded files stored locally
- User-specific document listing
- User-specific document deletion

Third git push:

- Text extraction from `.txt` files
- Text extraction from basic PDFs
- Processing status per document
- Document detail view
- Extracted text visible from frontend
- User isolation for document detail

## Stack

- FastAPI
- React
- PostgreSQL
- SQLAlchemy
- JWT Authentication

## Running the Backend

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

## Next Steps

- Split extracted text into chunks
- Generate embeddings for document chunks
- Store embeddings in PostgreSQL
- Implement semantic search over user documents