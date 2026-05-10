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

Fourth git push:

- Document chunking
- Chunk storage in PostgreSQL
- OpenAI embeddings per chunk
- Semantic search over document chunks
- User-specific retrieval
- Protected `/documents/search` endpoint

Fifth git push:

- RAG chat endpoint
- Context-aware answers using uploaded documents
- Source chunks returned with each answer
- Frontend chat page
- Loading and error states
- User-specific document chat

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

- Store chat history
- Improve workspace UX
- Add document selection for chat
- Add summaries and advanced document actions
- Prepare for deployment