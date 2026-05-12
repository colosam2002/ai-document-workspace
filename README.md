# AI Document Workspace

AI Document Workspace is a full-stack application that allows users to upload documents, extract their content, search them semantically, and chat with them using Retrieval-Augmented Generation (RAG).

## Features

- User authentication with JWT
- User-isolated document workspaces
- TXT and PDF document upload
- Automatic text extraction
- Document chunking
- OpenAI embeddings
- Semantic search over document chunks
- RAG-based document chat
- Chat across all documents or a selected document
- Source-aware answers
- Visual chat history during the session
- Automatic document summaries
- Similarity threshold to reduce irrelevant answers
- React dashboard with workspace statistics

## Tech Stack

### Backend

- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT authentication
- OpenAI API
- PyPDF

### Frontend

- React
- Vite
- React Router
- Fetch API

### AI / RAG

- Text extraction
- Chunking
- Embeddings
- Cosine similarity
- Retrieval-Augmented Generation

## Architecture

```text
User
 ↓
React Frontend
 ↓
FastAPI Backend
 ↓
PostgreSQL
 ↓
Document chunks + embeddings
 ↓
Semantic search
 ↓
RAG answer generation
```

## How it works

1. The user uploads a TXT or PDF document.
2. The backend stores the file and metadata.
3. Text is extracted from the document.
4. The extracted text is split into chunks.
5. Each chunk is embedded using the OpenAI API.
6. The user asks a question.
7. The system retrieves the most relevant chunks.
8. The model generates an answer using only the retrieved context.
9. The frontend displays the answer and its sources.

## Running the project

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend

Create backend/.env:

```bash
DATABASE_URL=postgresql://user:password@localhost/db_name
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend

Create frontend/.env:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

## Current Status

Completed as a full-stack AI project.

The application currently supports authenticated document workspaces, document upload, text extraction, embeddings, semantic search, RAG chat, document summaries, and a React-based workspace UI.

### Future Improvements

- Persistent chat history
- Docker setup
- pgvector integration
- Cloud deployment
- Better responsive design
- OCR support for scanned PDFs
- Streaming AI responses
- Automated tests
- Document collections and tags
- More advanced citation UI

## Author

Built by Colomán Samprón as a portfolio and learning project exploring modern backend and frontend development, LLM integrations, and retrieval-augmented generation (RAG).

- GitHub: https://github.com/colosam2002
- LinkedIn: https://linkedin.com/in/colomán-samprón-garcía-47487634a
