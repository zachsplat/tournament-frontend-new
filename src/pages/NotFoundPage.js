// src/pages/NotFoundPage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Box>
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" gutterBottom>
          Sorry, the page you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 2 }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;

