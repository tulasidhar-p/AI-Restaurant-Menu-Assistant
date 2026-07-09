from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embeddings
from app.services.chroma_service import store_embeddings
from app.services.embedding_service import generate_query_embedding
from app.services.chroma_service import search_embeddings
from app.services.gemini_service import generate_answer
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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

    upload_folder = "uploads"

    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from the uploaded PDF
    extracted_text = extract_text_from_pdf(file_path)
    chunks = chunk_text(extracted_text)
    embeddings = generate_embeddings(chunks)
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
    Search the uploaded menu and generate an AI answer.
    """

    # Generate embedding for the user's question
    query_embedding = generate_query_embedding(query)

    # Search ChromaDB
    results = search_embeddings(query_embedding)

    # Get the retrieved chunks
    documents = results["documents"][0]

    # Combine them into one context
    context = "\n\n".join(documents)

    # Generate AI answer
    answer = generate_answer(query, context)

    return {
        "question": query,
        "answer": answer,
        "retrieved_chunks": documents
    }