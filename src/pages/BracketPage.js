// src/pages/BracketPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Alert, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

const BracketPage = () => {
  const { tournamentId } = useParams();
  const [bracket, setBracket] = useState(null);
  const [tournamentName, setTournamentName] = useState('');
  const [error, setError] = useState('');

  const fetchBracket = useCallback(async () => {
    try {
      const [bracketResponse, tournamentResponse] = await Promise.all([
        API.get(`/brackets/tournament/${tournamentId}`),
        API.get(`/tournaments/${tournamentId}`)
      ]);
      setBracket(bracketResponse.data.data.bracket_data);
      setTournamentName(tournamentResponse.data.data.name);
    } catch (err) {
      console.error('Error fetching bracket:', err);
      setError('Failed to load bracket.');
    }
  }, [tournamentId]);

  useEffect(() => {
    fetchBracket();
  }, [fetchBracket]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {tournamentName} - Brackets
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {Object.keys(bracket || {}).map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5">{category} Bracket</Typography>
          <pre>{JSON.stringify(bracket[category], null, 2)}</pre>
        </Box>
      ))}
    </Container>
  );
};

export default BracketPage;

