// src/pages/Admin/BracketManagementPage.js

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';
import API from '../../utils/api';
import { useParams } from 'react-router-dom';

const BracketManagementPage = () => {
  const { tournamentId } = useParams();
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBracket = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/brackets/tournament/${tournamentId}`);
      setBracket(response.data.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setBracket(null); // Bracket not generated yet
      } else {
        console.error('Error fetching bracket:', err);
        setError('Failed to load bracket. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBracket = async () => {
    setLoading(true);
    try {
      const response = await API.post(`/brackets/tournament/${tournamentId}/generate`);
      setSuccessMessage(response.data.message);
      setBracket(response.data);
    } catch (err) {
      console.error('Error generating bracket:', err);
      setError(
        err.response?.data?.error || 'Failed to generate bracket. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBracket();
  }, [tournamentId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bracket Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          {bracket ? (
            <Box>
              {/* Render the bracket data */}
              <Typography variant="h6">Bracket:</Typography>
              <pre>{JSON.stringify(bracket.bracket_data, null, 2)}</pre>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ mb: 2 }}>
              No bracket generated for this tournament yet.
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleGenerateBracket}>
            Generate Bracket
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BracketManagementPage;

