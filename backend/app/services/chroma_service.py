import chromadb

# Create a persistent ChromaDB client
client = chromadb.PersistentClient(path="chroma_db")

# Create (or get) a collection
collection = client.get_or_create_collection(
    name="restaurant_menu"
)


def store_embeddings(chunks, embeddings):
    """
    Store chunks and their embeddings in ChromaDB.
    """

    ids = [str(i) for i in range(len(chunks))]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist()
    )


def search_embeddings(query_embedding, top_k=3):
    """
    Search for the most similar chunks.
    """

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k
    )

    return results