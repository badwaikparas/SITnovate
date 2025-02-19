import { useState, useRef } from 'react';

const DocumentSummarizer = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [documentType, setDocumentType] = useState('research');
  const [extractedText, setExtractedText] = useState("");
  const [file, setFile] = useState(null); // Store the uploaded file
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Trigger file input click when the upload area is clicked
  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  // Send the file to the backend for text extraction
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file); // Use "pdf" as the field name

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setExtractedText(data.text); // Store extracted text
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Failed to extract text from the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(to bottom right, #111827, #1f2937, #1e3a8a)',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      position: 'absolute',
      left: 0,
      right: 0,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '80px', paddingRight: '16px' }}>
        <h1 style={{ color: '#93c5fd', marginBottom: '0.5rem' }}>
          AI Document Summarizer
        </h1>
        <h2 style={{ color: '#bfdbfe', marginBottom: '2rem' }}>
          Generate concise, accurate summaries powered by AI
        </h2>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📄', title: 'Easy Upload', desc: 'Drag & drop or paste your document' },
            { icon: '🔍', title: 'Smart Analysis', desc: 'AI extracts key information & context' },
            { icon: '✅', title: 'Instant Results', desc: 'Get concise, accurate summaries instantly' }
          ].map((item, index) => (
            <div key={index} style={{ flex: 1, background: 'rgba(31, 41, 55, 0.7)', padding: '1.5rem', borderRadius: '8px' }}>
              <div style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '2rem' }}>{item.icon}</div>
              <h3 style={{ color: '#93c5fd', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: '#e2e8f0' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(31, 41, 55, 0.7)', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              style={{
                marginRight: '0.5rem',
                padding: '0.5rem 1rem',
                background: activeTab === 'upload' ? '#3f8cff' : 'transparent',
                border: '1px solid #3f8cff',
                color: activeTab === 'upload' ? '#fff' : '#3f8cff',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('upload')}
            >
              Upload Document
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                background: activeTab === 'paste' ? '#3f8cff' : 'transparent',
                border: '1px solid #3f8cff',
                color: activeTab === 'paste' ? '#fff' : '#3f8cff',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('paste')}
            >
              Paste Text
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#e2e8f0', marginBottom: '0.5rem', display: 'block' }}>Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '4px',
                color: '#e2e8f0'
              }}
            >
              <option value="research">Research Paper</option>
              <option value="legal">Legal Contract</option>
              <option value="news">News Article</option>
              <option value="medical">Medical Document</option>
              <option value="financial">Financial Report</option>
            </select>
          </div>

          {activeTab === 'upload' ? (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  background: 'rgba(31, 41, 55, 0.3)',
                  border: '2px dashed rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={handleUploadAreaClick}
              >
                <div style={{ fontSize: '3rem', color: '#60a5fa', marginBottom: '1rem' }}>📄</div>
                <p style={{ color: '#e2e8f0' }}>
                  {file ? file.name : "Upload your PDF"}
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#3f8cff',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </form>
          ) : (
            <textarea
              rows={6}
              placeholder="Paste your document text here..."
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(31, 41, 55, 0.3)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '4px',
                color: '#e2e8f0'
              }}
            />
          )}
        </div>

        {loading ? (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>Loading...</div>
        ) : extractedText && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(31, 41, 55, 0.5)', borderRadius: '8px', color: '#e2e8f0' }}>
            {extractedText}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentSummarizer;