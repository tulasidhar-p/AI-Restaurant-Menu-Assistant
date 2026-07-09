from sentence_transformers import SentenceTransformer

# Load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):
    """
    Generate embeddings for a list of text chunks.
    """

    embeddings = model.encode(chunks)

    return embeddings

def generate_query_embedding(query):
    """
    Generate an embedding for a user's question.
    """

    embedding = model.encode(query)

    return embedding