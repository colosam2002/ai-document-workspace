CHUNK_SIZE = 1000
CHUNK_OVERLAP = 150


def split_text_into_chunks(
    text: str,
    chunk_size: int = CHUNK_SIZE,
    chunk_overlap: int = CHUNK_OVERLAP,
) -> list[str]:
    if not text:
        return []

    cleaned_text = text.strip()

    if not cleaned_text:
        return []

    if chunk_overlap >= chunk_size:
        raise ValueError("chunk_overlap must be smaller than chunk_size")

    chunks = []
    start = 0
    previous_start = -1
    text_length = len(cleaned_text)

    while start < text_length:
        if start == previous_start:
            break

        previous_start = start

        end = min(start + chunk_size, text_length)

        if end < text_length:
            last_space = cleaned_text.rfind(" ", start, end)

            if last_space != -1 and last_space > start:
                end = last_space

        chunk = cleaned_text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        start = end - chunk_overlap

        if start < 0:
            start = 0

    return chunks