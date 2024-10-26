// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light', // Use 'dark' for dark mode
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
  typography: {
    // Customize typography
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

