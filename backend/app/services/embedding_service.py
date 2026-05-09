from fastapi import HTTPException
from openai import OpenAI

client = OpenAI()


def create_embedding(text: str) -> list[float]:
    try:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
        )

        return response.data[0].embedding

    except Exception as e:
        print(f"[EMBEDDING ERROR]: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error generating embedding",
        )