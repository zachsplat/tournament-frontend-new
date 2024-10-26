// src/theme.js
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: blue[700], // Deep blue for primary color
      contrastText: '#fff',
    },
    secondary: {
      main: grey[800], // Dark grey for secondary color
      contrastText: '#fff',
    },
    background: {
      default: grey[100],
      paper: '#fff',
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Keeps button text as-is
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        containedPrimary: {
          boxShadow: '0px 3px 5px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: '0px 5px 8px rgba(25, 118, 210, 0.4)',
          },
        },
        containedSecondary: {
          boxShadow: '0px 3px 5px rgba(97, 97, 97, 0.3)',
          '&:hover': {
            boxShadow: '0px 5px 8px rgba(97, 97, 97, 0.4)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${grey[300]}`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;

