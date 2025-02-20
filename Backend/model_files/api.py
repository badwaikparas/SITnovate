from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import subprocess
from chat import converse
from flask import *
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Directory to store uploaded files
UPLOAD_FOLDER = "source_documents"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

class QueryModel(BaseModel):
    query: str

async def process_json(request: QueryModel):
    try:
        response = {
            "message": f"You said: {request.query}"
        }
        return response

    except Exception as e:
        return {"error": str(e)}
    
from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/prompt")
async def process_json(request: Request):
    try:
        # Read the request body
        body = await request.body()  # Get raw bytes
        body_text = body.decode("utf-8")  # Convert bytes to string
        

        return body_text

    except Exception as e:
        return {"error": str(e)}


@app.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    saved_files = []
    for file in files:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        saved_files.append(file.filename)
    
    
    return {"message": "Files uploaded successfully", "files": saved_files}

@app.get("/submit")
def create_embeddings():
    subprocess.run(["python", "model.py"])
    return {"message" : "submitted"}

@app.put("/chat")
def chat():
    subprocess.run(["python", "chat.py"])
    
# @app.get("/prompt")
# async def prompt():
#     # subprocess.run(["python", "chat.py"])
#     # query = await request.body()
#     # query = query.decode("utf-8").strip()
#     # response = converse(query)
    
#     return "response"
#     # converse(response)
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
