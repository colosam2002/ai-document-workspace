from fastapi import HTTPException
from openai import OpenAI

client = OpenAI()


DOCUMENT_CHAT_INSTRUCTIONS = """
You are an AI assistant that answers questions using the user's uploaded documents.

Rules:
- Answer only using the provided context.
- If the context is not enough to answer, say that you don't have enough information in the documents.
- Do not invent facts.
- Be clear and concise.
- Answer in the same language as the user's question.
"""


def generate_answer_from_context(question: str, context: str) -> str:
    try:
        prompt = f"""
Context:
{context}

Question:
{question}
"""

        response = client.responses.create(
            model="gpt-5.4-mini",
            instructions=DOCUMENT_CHAT_INSTRUCTIONS,
            input=prompt,
        )

        answer = response.output_text

        if not answer or not answer.strip():
            raise HTTPException(
                status_code=500,
                detail="The model returned an empty answer",
            )

        return answer.strip()

    except HTTPException:
        raise

    except Exception as e:
        print(f"[AI ANSWER ERROR]: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error generating answer from documents",
        )