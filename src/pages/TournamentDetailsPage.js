// src/pages/TournamentDetailsPage.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [tournament, setTournament] = useState(null);
  const [bracketAvailable, setBracketAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tournament details and bracket status
  const fetchTournamentDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get(`/tournaments/${id}`);
      setTournament(response.data.data);

      // Check if bracket is available
      try {
        await API.get(`/brackets/tournament/${id}`);
        setBracketAvailable(true);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setBracketAvailable(false);
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error('Error fetching tournament details:', err);
      setError('Failed to load tournament details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTournamentDetails();
  }, [fetchTournamentDetails]);

  // Navigate to the ticket purchase page
  const handlePurchaseTicket = () => {
    navigate(`/purchase-ticket/${tournament.tournament_id}`);
  };

  // Navigate to the bracket page or bracket generation based on availability
  const handleViewBracket = () => {
    if (bracketAvailable) {
      navigate(`/tournaments/${tournament.tournament_id}/bracket`);
    } else {
      if (auth.role === 'admin') {
        navigate(`/admin/tournaments/${tournament.tournament_id}/generate-bracket`);
      } else {
        alert('Bracket is not available yet.');
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Format tournament date
  const formattedDate = tournament.date
    ? new Date(tournament.date).toLocaleDateString()
    : 'Date not available';

  const availableTickets = tournament.max_tickets - tournament.sold_tickets || 0;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {tournament.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Date: {formattedDate}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Location: {tournament.location || 'Location not specified'}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Available Tickets: {availableTickets}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Price: ${tournament.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {tournament.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePurchaseTicket}
        >
          Purchase Ticket
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleViewBracket}
        >
          {bracketAvailable ? 'View Bracket' : auth.role === 'admin' ? 'Generate Bracket' : 'Bracket Not Available'}
        </Button>
      </Box>
    </Container>
  );
};

export default TournamentDetailsPage;

