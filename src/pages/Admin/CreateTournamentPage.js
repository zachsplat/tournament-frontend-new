// src/pages/Admin/CreateTournamentPage.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TournamentForm from '../../components/Admin/TournamentForm';

const CreateTournamentPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create New Tournament
        </Typography>
        <TournamentForm />
      </Box>
    </Container>
  );
};

export default CreateTournamentPage;

