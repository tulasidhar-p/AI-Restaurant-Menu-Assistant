from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import (
    generate_embeddings,
    generate_query_embedding,
)
from app.services.chroma_service import (
    store_embeddings,
    search_embeddings,
)
from app.services.gemini_service import generate_answer

import shutil
import os

app = FastAPI(
    title="AI Restaurant Menu Assistant API",
    version="1.0.0",
    description="Backend API for AI-powered restaurant menu analysis using RAG.",
)

# Update the Vercel URL after frontend deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-restaurant-menu-assistant.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Restaurant Menu Assistant API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Backend is running successfully"
    }


@app.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a restaurant menu PDF, extract text, generate embeddings,
    and store them in ChromaDB.
    """

    # Validate uploaded file
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    # Create upload directory
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "..", "uploads")
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Split into chunks
    chunks = chunk_text(extracted_text)

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Store embeddings
    store_embeddings(chunks, embeddings)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "total_chunks": len(chunks),
        "total_embeddings": len(embeddings),
        "embedding_dimension": len(embeddings[0]),
        "stored_in_chromadb": True
    }


@app.get("/search")
def search(query: str):
    """
    Search the uploaded restaurant menu and generate an AI answer.
    """

    # Generate embedding for the user's query
    query_embedding = generate_query_embedding(query)

    # Search ChromaDB
    results = search_embeddings(query_embedding)

    documents = results["documents"][0]

    # Handle empty search results
    if not documents:
        return {
            "question": query,
            "answer": "No relevant information was found in the uploaded menu.",
            "retrieved_chunks": []
        }

    # Combine retrieved chunks into context
    context = "\n\n".join(documents)

    # Generate answer using Gemini
    answer = generate_answer(query, context)

    return {
        "question": query,
        "answer": answer,
        "retrieved_chunks": documents
    }