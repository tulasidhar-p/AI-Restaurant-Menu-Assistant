from sentence_transformers import SentenceTransformer

# Global model variable
_model = None


def get_model():
    """
    Lazy-load the embedding model only when it is first needed.
    """
    global _model

    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")

    return _model


def generate_embeddings(chunks):
    """
    Generate embeddings for a list of text chunks.
    """
    model = get_model()
    embeddings = model.encode(chunks)

    return embeddings


def generate_query_embedding(query):
    """
    Generate an embedding for a user's question.
    """
    model = get_model()
    embedding = model.encode(query)

    return embedding