# AI Document Workspace

Full-stack AI workspace to upload documents, search knowledge, and chat with files using RAG.

## Current Status

The application currently supports:

- User authentication with JWT
- User-isolated document workspaces
- TXT and PDF document upload
- Automatic text extraction
- Document chunking
- OpenAI embeddings
- Semantic search over document chunks
- RAG chat with uploaded documents
- Chat across all documents or a selected document
- Source-aware answers
- Visual chat history during the session
- Automatic document summaries
- Similarity threshold to reduce irrelevant answers

## Current Features

- User authentication with JWT
- Upload TXT and PDF documents
- Automatic text extraction
- Document chunking and embeddings
- Semantic search over uploaded files
- RAG-based document chat
- User-isolated document workspaces
- React frontend workspace UI
- Dashboard with workspace statistics
- Source-aware AI answers

## Architecture

Backend:
- FastAPI
- PostgreSQL
- SQLAlchemy
- OpenAI API

Frontend:
- React
- React Router
- Fetch API

AI Features:
- Embeddings
- Semantic search
- Retrieval-Augmented Generation (RAG)

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

- Prepare production deployment
- Improve environment configuration
- Add persistent chat history
- Add document-level metadata
- Add better styling and responsive layout
- Consider pgvector for scalable vector search