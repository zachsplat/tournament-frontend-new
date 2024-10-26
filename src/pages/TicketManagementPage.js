// src/pages/TicketManagementPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import API from '../utils/api';
import TicketList from '../components/Tickets/TicketList';

const TicketManagementPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState('all');

  const fetchTickets = async (status = '') => {
    setLoading(true);
    try {
      const response = await API.get('/tickets', {
        params: { status },
      });
      setTickets(response.data.data);
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    fetchTickets(newValue === 'all' ? '' : newValue);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="ticket status tabs"
        sx={{ mb: 2 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Purchased" value="purchased" />
        <Tab label="Checked In" value="checked_in" />
        <Tab label="Canceled" value="canceled" />
      </Tabs>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : tickets.length > 0 ? (
        <TicketList tickets={tickets} refreshTickets={() => fetchTickets(tabValue)} />
      ) : (
        <Typography variant="body1">No tickets found.</Typography>
      )}
    </Container>
  );
};

export default TicketManagementPage;

