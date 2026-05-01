from pypdf import PdfReader


SUPPORTED_TEXT_TYPES = {
    "text/plain",
}

SUPPORTED_PDF_TYPES = {
    "application/pdf",
}


def extract_text_from_txt(file_path: str) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()

        return clean_extracted_text(text)

    except UnicodeDecodeError:
        with open(file_path, "r", encoding="latin-1") as file:
            text = file.read()

        return clean_extracted_text(text)


def extract_text_from_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)

    pages_text = []

    for page in reader.pages:
        text = page.extract_text()

        if text:
            pages_text.append(text)

    return clean_extracted_text("\n\n".join(pages_text))


def clean_extracted_text(text: str) -> str:
    lines = text.splitlines()

    cleaned_lines = []

    for line in lines:
        cleaned_line = line.strip()

        if cleaned_line:
            cleaned_lines.append(cleaned_line)

    return "\n".join(cleaned_lines).strip()


def extract_text(file_path: str, content_type: str | None, filename: str) -> str | None:
    filename_lower = filename.lower()

    if content_type in SUPPORTED_TEXT_TYPES or filename_lower.endswith(".txt"):
        return extract_text_from_txt(file_path)

    if content_type in SUPPORTED_PDF_TYPES or filename_lower.endswith(".pdf"):
        return extract_text_from_pdf(file_path)

    return None