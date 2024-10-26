// src/components/Admin/TournamentForm.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import API from '../../utils/api';

const TournamentForm = ({ existingTournament = null, onSuccess, onCancel }) => {
  const [name, setName] = useState(existingTournament ? existingTournament.name : '');
  const [description, setDescription] = useState(existingTournament ? existingTournament.description : '');
  const [date, setDate] = useState(existingTournament ? existingTournament.date : '');
  const [location, setLocation] = useState(existingTournament ? existingTournament.location : '');
  const [maxTickets, setMaxTickets] = useState(existingTournament ? existingTournament.max_tickets : '');
  const [price, setPrice] = useState(existingTournament ? existingTournament.price : '');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form when existingTournament changes
  useEffect(() => {
    if (existingTournament) {
      setName(existingTournament.name);
      setDescription(existingTournament.description);
      setDate(existingTournament.date);
      setLocation(existingTournament.location);
      setMaxTickets(existingTournament.max_tickets);
      setPrice(existingTournament.price);
    } else {
      // Reset fields for new tournament
      setName('');
      setDescription('');
      setDate('');
      setLocation('');
      setMaxTickets('');
      setPrice('');
    }

    // Cleanup if necessary
  }, [existingTournament]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic front-end validation
    if (!name.trim()) {
      setError('Tournament name is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    if (!date) {
      setError('Date is required.');
      return;
    }
    if (!location.trim()) {
      setError('Location is required.');
      return;
    }
    if (!maxTickets || maxTickets < 1) {
      setError('Max tickets must be at least 1.');
      return;
    }
    if (price === '' || price < 0) {
      setError('Price must be a non-negative number.');
      return;
    }

    setLoading(true);

    const payload = {
      name,
      description,
      date,
      location,
      max_tickets: parseInt(maxTickets, 10),
      price: parseInt(price, 10),
    };

    try {
      if (existingTournament) {
        await API.put(`/tournaments/${existingTournament.tournament_id}`, payload);
      } else {
        await API.post('/tournaments', payload);
      }
      onSuccess();
    } catch (err) {
      console.error('Tournament Form Error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.response && err.response.data && err.response.data.errors) {
        // Handle validation errors from backend
        const validationErrors = err.response.data.errors.map((err) => err.msg).join(' ');
        setError(validationErrors);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Tournament Name"
        fullWidth
        required
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        required
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Location"
        fullWidth
        required
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Max Tickets"
        type="number"
        fullWidth
        required
        margin="normal"
        value={maxTickets}
        onChange={(e) => setMaxTickets(e.target.value)}
        inputProps={{ min: 1 }}
      />
      <TextField
        label="Price"
        type="number"
        fullWidth
        required
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        inputProps={{ min: 0 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button onClick={onCancel} sx={{ mr: 2 }}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};

export default TournamentForm;

