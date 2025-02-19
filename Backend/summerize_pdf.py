from langchain.chat_models import ChatOllama
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

# Initialize Ollama model
llm = ChatOllama(
    model="llama3",
    callback_manager=CallbackManager([StreamingStdOutCallbackHandler()])
)

# Load the PDF
pdf_path = "./model_files/source_documents/CN Practical.pdf"  # Change this to your file path
loader = PyPDFLoader(pdf_path)
pages = loader.load()

# Split text into manageable chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=500)
docs = text_splitter.split_documents(pages)

# Summarization Chain
summary_chain = load_summarize_chain(llm, chain_type="map_reduce")

# Run summarization
summary = summary_chain.run(docs)

print("\n📄 PDF Summary:\n", summary)

