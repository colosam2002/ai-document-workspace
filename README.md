# AI Document Workspace

Full-stack AI workspace to upload documents, search knowledge, and chat with files using RAG.

## Current Status

Week 1 completed:

- FastAPI backend
- React frontend
- PostgreSQL connection
- User registration
- JWT login
- Protected dashboard
- Logout flow

Week 2 completed:

- User authentication
- Protected dashboard
- Document upload from frontend
- Document metadata stored in PostgreSQL
- Uploaded files stored locally
- User-specific document listing
- User-specific document deletion

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

- Extract text from uploaded documents
- Support PDF parsing
- Store extracted text in database
- Prepare documents for chunking and embeddings