//src/components/Admin/BracketManagement.js

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const BracketManagement = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const response = await API.get('/tournaments');
      setTournaments(response.data.data);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBracket = async () => {
    if (!selectedTournament) {
      setError('Please select a tournament.');
      return;
    }
    setLoading(true);
    try {
      const response = await API.post(`/brackets/tournament/${selectedTournament}/generate`);
      setBracket(response.data.bracket_data);
      setSuccessMessage(response.data.message);
    } catch (err) {
      console.error('Error generating bracket:', err);
      setError(err.response?.data?.error || 'Failed to generate bracket.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditBracket = () => {
    navigate(`/admin/tournaments/${selectedTournament}/edit-bracket`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Bracket Management
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="tournament-select-label">Select Tournament</InputLabel>
        <Select
          labelId="tournament-select-label"
          value={selectedTournament}
          label="Select Tournament"
          onChange={(e) => setSelectedTournament(e.target.value)}
        >
          {tournaments.map((tournament) => (
            <MenuItem key={tournament.tournament_id} value={tournament.tournament_id}>
              {tournament.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateBracket}
          disabled={!selectedTournament || loading}
        >
          Generate Bracket
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleEditBracket}
          disabled={!selectedTournament}
          sx={{ ml: 2 }}
        >
          Edit Bracket
        </Button>
      </Box>
      {loading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {bracket && (
        <Box sx={{ mt: 4 }}>
          {Object.keys(bracket).map((category) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6">{category} Bracket</Typography>
              {/* Replace with a proper bracket visualization component */}
              <pre>{JSON.stringify(bracket[category], null, 2)}</pre>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BracketManagement;

