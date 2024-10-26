// src/pages/TicketsPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import API from '../utils/api';
import TicketList from '../components/Tickets/TicketList';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch tickets from the backend
  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/tickets'); // Assuming GET /tickets returns all tickets for the user
      setTickets(response.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Tickets
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : tickets.length > 0 ? (
        <TicketList tickets={tickets} refreshTickets={fetchTickets} />
      ) : (
        <Typography variant="body1">You have no tickets purchased.</Typography>
      )}
    </Container>
  );
};

export default TicketsPage;
