import os

import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create model
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_answer(query, context):
    """
    Generate an answer using Gemini based only on the provided menu context.
    """

    prompt = f"""
You are an AI Restaurant Menu Assistant.

Answer ONLY using the information provided below.

If the answer is not present in the menu, politely say:
"I couldn't find that information in the uploaded menu."

Menu Context:
{context}

Customer Question:
{query}

Answer:
"""

    response = model.generate_content(prompt)

    return response.text