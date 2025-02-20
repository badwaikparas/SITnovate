from langchain.chat_models import ChatOllama
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

# Initialize Ollama model
llm = ChatOllama(
    model="llama3",
    callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]),
    temperature=0.3  # Lower temperature for more factual and concise outputs
)

# Load the PDF
pdf_path = "./model_files/source_documents/CN Practical.pdf"  # Change this to your file path
loader = PyPDFLoader(pdf_path)
pages = loader.load()

# Split text into manageable chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=4000,  # Increase chunk size to retain more context
    chunk_overlap=1000  # Increase overlap to ensure continuity between chunks
)
docs = text_splitter.split_documents(pages)

# Summarization Chain
# Use "refine" chain type for better detail retention
summary_chain = load_summarize_chain(
    llm,
    chain_type="refine",  # "refine" is better for detailed summaries
    verbose=True  # Enable verbose logging to debug the summarization process
)

# Run summarization
summary = summary_chain.run(docs)

print("\n📄 PDF Summary:\n", summary)