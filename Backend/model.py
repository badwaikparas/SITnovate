from transformers import pipeline


def  summerize_text(extracted_data):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summerized_output = summarizer(extracted_data, max_length=len(extracted_data), min_length=1, do_sample=False)
    
    return summerized_output
    

