# AI Document Workspace

Full-stack AI workspace to upload documents, search knowledge, and chat with files using RAG.

## Current Status

The application currently supports:
- authenticated document workspaces
- AI-powered semantic search
- chat with uploaded documents
- source-aware RAG responses
- multi-page frontend workspace UI

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

- Store chat history
- Improve workspace UX
- Add document selection for chat
- Add summaries and advanced document actions
- Prepare for deployment