// src/pages/Admin/AdminBracketPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';
import { Container, Typography, Button, Alert, CircularProgress } from '@mui/material';

const AdminBracketPage = () => {
  const { tournamentId } = useParams();
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBracket();
  }, []);

  const fetchBracket = async () => {
    try {
      const response = await API.get(`/brackets/${tournamentId}`);
      setBracket(response.data.data);
    } catch (err) {
      setError('Failed to load bracket.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBracket = async () => {
    setLoading(true);
    try {
      await API.post(`/brackets/tournaments/${tournamentId}/generate`);
      fetchBracket();
    } catch (err) {
      setError('Failed to generate bracket.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bracket Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {bracket ? (
        <>
          {/* Display the bracket */}
          <Typography variant="body1">Bracket Data:</Typography>
          <pre>{JSON.stringify(bracket, null, 2)}</pre>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleGenerateBracket}>
          Generate Bracket
        </Button>
      )}
    </Container>
  );
};

export default AdminBracketPage;

