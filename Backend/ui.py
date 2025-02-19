import streamlit as st
from ReadFiles.read_document import read_txt

def file_upload_download():
    #__ BASIC UI
    st.title("File Upload and Download App")
    uploaded_file = st.file_uploader("Upload a file", type=["txt", "csv", "png", "jpg", "pdf"])
    
    
    #__ FILE UPLOAD
    if uploaded_file is not None:
        st.success("File uploaded successfully!")
        
        print(uploaded_file.type)
        
        #// Read File Type
        if uploaded_file.type == "text/plain":
            text = read_txt(uploaded_file)
            st.write(text)
            
        if uploaded_file.type == "application/pdf":
            text = read_txt(uploaded_file)