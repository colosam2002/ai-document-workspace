from fastapi import HTTPException
from openai import OpenAI

client = OpenAI()


DOCUMENT_CHAT_INSTRUCTIONS = """
You are an AI assistant that answers questions using retrieved document context.

Rules:
- Use ONLY the provided document context.
- Do NOT invent information.
- If the answer is not clearly supported by the context, say so.
- Be concise but informative.
- Prefer accurate answers over speculative answers.
- Mention uncertainty when context is incomplete.
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
    
DOCUMENT_SUMMARY_INSTRUCTIONS = """
You are an AI assistant that summarizes uploaded documents.

Rules:
- Summarize only the provided document text.
- Do not invent information.
- Be clear and concise.
- Use the same language as the document when possible.
- If the text is too short or unclear, say that there is not enough content to summarize.
"""


def summarize_document_text(text: str) -> str:
    try:
        prompt = f"""
Document text:
{text}
"""

        response = client.responses.create(
            model="gpt-5.4-mini",
            instructions=DOCUMENT_SUMMARY_INSTRUCTIONS,
            input=prompt,
        )

        summary = response.output_text

        if not summary or not summary.strip():
            raise HTTPException(
                status_code=500,
                detail="The model returned an empty summary",
            )

        return summary.strip()

    except HTTPException:
        raise

    except Exception as e:
        print(f"[DOCUMENT SUMMARY ERROR]: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error generating document summary",
        )