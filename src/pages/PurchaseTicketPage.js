// src/pages/PurchaseTicketPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, CircularProgress, TextField, MenuItem, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PurchaseTicketForm = ({ tournament, profiles }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [setError] = useState('');

  const handlePurchase = async () => {
    if (!selectedProfileId || !stripe || !elements) return;

    setProcessingPayment(true);
    try {
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
      await API.post(`/profiles/${selectedProfileId}/tickets`, {
        tournament_id: tournament.tournament_id,
        payment_method_id: paymentMethod.id,
      });
      navigate('/tickets');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Purchase Ticket for {tournament.name}</Typography>
      <TextField
        select
        label="Select Profile"
        fullWidth
        required
        value={selectedProfileId}
        onChange={(e) => setSelectedProfileId(e.target.value)}
        sx={{ mt: 2 }}
      >
        {profiles.map((profile) => (
          <MenuItem key={profile.profile_id} value={profile.profile_id}>{profile.name}</MenuItem>
        ))}
      </TextField>
      <CardElement />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handlePurchase}
        disabled={processingPayment}
      >
        {processingPayment ? <CircularProgress size={24} color="inherit" /> : 'Purchase Ticket'}
      </Button>
    </Box>
  );
};

const PurchaseTicketPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTournamentDetails = useCallback(async () => {
    try {
      const response = await API.get(`/tournaments/${id}`);
      setTournament(response.data.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await API.get('/profiles');
      setProfiles(response.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchTournamentDetails(), fetchProfiles()]);
  }, [fetchTournamentDetails, fetchProfiles]);

  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : (
        <Elements stripe={stripePromise}>
          <PurchaseTicketForm tournament={tournament} profiles={profiles} />
        </Elements>
      )}
    </Container>
  );
};

export default PurchaseTicketPage;

