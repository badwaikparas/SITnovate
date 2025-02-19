
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper,
  IconButton,
  ThemeProvider,
  createTheme,
  Container,
  Select,
  MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DocumentSummarizer from './components/FileUploader';

// Create dark theme
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

const Layout = ({ children }) => (
  <Box sx={{ 
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #111827, #1f2937, #1e3a8a)',
    display: 'flex'
  }}>
    <Paper
      elevation={3}
      sx={{
        width: 64,
        position: 'fixed',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        background: 'rgba(31, 41, 55, 0.95)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <IconButton component={Link} to="/" sx={{ color: '#60a5fa' }}>
          <HomeIcon />
        </IconButton>
        <IconButton component={Link} to="/history" sx={{ color: '#94a3b8' }}>
          <HistoryIcon />
        </IconButton>
        <IconButton component={Link} to="/settings" sx={{ color: '#94a3b8' }}>
          <SettingsIcon />
        </IconButton>
      </Box>
      <IconButton sx={{ mt: 'auto', color: '#94a3b8' }}>
        <LogoutIcon />
      </IconButton>
    </Paper>

    <Box sx={{ pl: '64px', width: '100%' }}>
      {children}
    </Box>
  </Box>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const HistoryPage = () => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h4" sx={{ color: '#93c5fd', mb: 3 }}>
      Summary History
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[1, 2, 3].map((item) => (
        <Paper
          key={item}
          sx={{
            p: 3,
            background: 'rgba(31, 41, 55, 0.7)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" sx={{ color: '#60a5fa' }}>
              Research Paper Summary
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              2 hours ago
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </Typography>
        </Paper>
      ))}
    </Box>
  </Container>
);

const SettingsPage = () => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h4" sx={{ color: '#93c5fd', mb: 3 }}>
      Settings
    </Typography>
    <Paper
      sx={{
        p: 4,
        background: 'rgba(31, 41, 55, 0.7)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
            Default Summary Length
          </Typography>
          <Select
            fullWidth
            defaultValue="medium"
            sx={{ background: 'rgba(31, 41, 55, 0.3)' }}
          >
            <MenuItem value="short">Short (1-2 paragraphs)</MenuItem>
            <MenuItem value="medium">Medium (3-4 paragraphs)</MenuItem>
            <MenuItem value="long">Long (5+ paragraphs)</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
            Export Format
          </Typography>
          <Select
            fullWidth
            defaultValue="text"
            sx={{ background: 'rgba(31, 41, 55, 0.3)' }}
          >
            <MenuItem value="text">Plain Text</MenuItem>
            <MenuItem value="markdown">Markdown</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: '#60a5fa', mb: 2 }}>
            Language
          </Typography>
          <Select
            fullWidth
            defaultValue="en"
            sx={{ background: 'rgba(31, 41, 55, 0.3)' }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </Box>
      </Box>
    </Paper>
  </Container>
);

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DocumentSummarizer />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;