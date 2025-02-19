from docx import Document
import fitz

def read_docx(file_path):
    doc = Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def read_txt(file):
    return file.read().decode("utf-8")

def read_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")  # Read from uploaded file
    text = "\n".join([page.get_text() for page in doc])  # Extract text from all pages
    return text