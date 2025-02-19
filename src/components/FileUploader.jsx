import  { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Grid,
  Select,
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f8cff',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
  },
});

const DocumentSummarizer = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [documentType, setDocumentType] = useState('research');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(to bottom right, #111827, #1f2937, #1e3a8a)',
          pt: 4,
          pb: 8,
          position: 'absolute', // Add this
          left: 0, // Add this
          right: 0, // Add this
        }}
      >
        <Container maxWidth={false} sx={{ pl: '80px', pr: '16px' }}> {/* Modified Container */}
          <Typography variant="h3" component="h1" sx={{ color: '#93c5fd', mb: 1 }}>
            AI Document Summarizer
          </Typography>
          <Typography variant="h6" sx={{ color: '#bfdbfe', mb: 4 }}>
            Generate concise, accurate summaries powered by AI
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { icon: <UploadFileIcon />, title: 'Easy Upload', desc: 'Drag & drop or paste your document' },
              { icon: <DescriptionIcon />, title: 'Smart Analysis', desc: 'AI extracts key information & context' },
              { icon: <CheckCircleIcon />, title: 'Instant Results', desc: 'Get concise, accurate summaries instantly' }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    background: 'rgba(31, 41, 55, 0.7)'
                  }}
                >
                  <Box sx={{ color: '#60a5fa', mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h6" sx={{ color: '#93c5fd', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper 
            elevation={3}
            sx={{ 
              p: 4, 
              mb: 4,
              background: 'rgba(31, 41, 55, 0.7)',
              width: '100%' // Add this
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Button
                variant={activeTab === 'upload' ? 'contained' : 'outlined'}
                onClick={() => setActiveTab('upload')}
                sx={{ mr: 2 }}
              >
                Upload Document
              </Button>
              <Button
                variant={activeTab === 'paste' ? 'contained' : 'outlined'}
                onClick={() => setActiveTab('paste')}
              >
                Paste Text
              </Button>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, color: '#e2e8f0' }}>
                  Document Type
                </Typography>
                <Select
                  fullWidth
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  sx={{ 
                    background: 'rgba(31, 41, 55, 0.5)',
                    width: '100%' // Add this
                  }}
                >
                  <MenuItem value="research">Research Paper</MenuItem>
                  <MenuItem value="legal">Legal Contract</MenuItem>
                  <MenuItem value="news">News Article</MenuItem>
                  <MenuItem value="medical">Medical Document</MenuItem>
                  <MenuItem value="financial">Financial Report</MenuItem>
                </Select>
              </Box>

              {activeTab === 'upload' ? (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    background: 'rgba(31, 41, 55, 0.3)',
                    border: '2px dashed rgba(148, 163, 184, 0.2)',
                    cursor: 'pointer',
                    width: '100%' // Add this
                  }}
                >
                  <UploadFileIcon sx={{ fontSize: 48, color: '#60a5fa', mb: 2 }} />
                  <Typography sx={{ color: '#e2e8f0' }}>
                    
                  </Typography>
                  <input type="file"  />
                </Paper>
              ) : (
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  placeholder="Paste your document text here..."
                  sx={{
                    width: '100%', // Add this
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(31, 41, 55, 0.3)',
                    }
                  }}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  width: '100%', // Add this
                  background: 'linear-gradient(to right, #2563eb, #3b82f6)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #1d4ed8, #2563eb)',
                  }
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    Analyzing...
                  </Box>
                ) : (
                  'Generate Summary'
                )}
              </Button>
            </form>
          </Paper>

          <Paper 
            elevation={3}
            sx={{ 
              p: 2,
              background: 'rgba(31, 41, 55, 0.7)',
              width: '100%' // Add this
            }}
          >
            <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
              Our AI system adapts to different document types and domains while preserving crucial context and maintaining accuracy.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DocumentSummarizer;


