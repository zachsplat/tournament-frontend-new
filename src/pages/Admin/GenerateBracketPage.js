// src/pages/Admin/GenerateBracketPage.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Typography, Alert, Button, Box } from '@mui/material';
import API from '../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const GenerateBracketPage = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [bracket, setBracket] = useState(null);
  const [tournamentName, setTournamentName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchTournament = useCallback(async () => {
    try {
      const response = await API.get(`/tournaments/${tournamentId}`);
      setTournamentName(response.data.data.name);
    } catch (err) {
      console.error('Error fetching tournament:', err);
      setError('Failed to load tournament details.');
    }
  }, [tournamentId]);

  useEffect(() => {
    if (auth.role !== 'admin') navigate('/dashboard');
    else fetchTournament();
  }, [auth, fetchTournament, navigate]);

  const generateBracket = async () => {
    try {
      const response = await API.post(`/brackets/tournament/${tournamentId}/generate`);
      setBracket(response.data.bracket_data);
      setSuccessMessage(response.data.message);
    } catch (err) {
      console.error('Error generating bracket:', err);
      setError(err.response?.data?.error || 'Failed to generate bracket.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generate Bracket - {tournamentName}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {bracket ? (
        <Box>
          {Object.keys(bracket).map((category) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6">{category} Bracket</Typography>
              <pre>{JSON.stringify(bracket[category], null, 2)}</pre>
            </Box>
          ))}
        </Box>
      ) : (
        <Button variant="contained" color="primary" onClick={generateBracket}>
          Generate Bracket
        </Button>
      )}
    </Container>
  );
};

export default GenerateBracketPage;

