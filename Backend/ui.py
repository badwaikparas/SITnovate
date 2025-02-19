import streamlit as st
from ReadFiles.read_document import read_txt, read_docx, read_pdf

def file_upload_download():
    #__ BASIC UI
    st.title("File Upload and Download App")
    uploaded_file = st.file_uploader("Upload a file", type=["txt", "csv", "png", "jpg", "pdf", "doc", "docx"])
    
    
    #__ FILE UPLOAD
    if uploaded_file is not None:
        st.success("File uploaded successfully!")
        
        
        # * File Type
        print(uploaded_file.type)
        
        
        text = ""

        match uploaded_file.type:
        #// Read File Type
            case "text/plain":
                text = read_txt(uploaded_file)
                # summerize_text(text)
                
                
            case "application/pdf":
                text = read_pdf(uploaded_file)
                # summerize_text(text)
                
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                text = read_docx(uploaded_file)
                # summerize_text(text)
                
        st.write(text)