// src/pages/Admin/EditBracketPage.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';

const EditBracketPage = () => {
  const { tournamentId } = useParams();
  const [bracket, setBracket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the bracket data for editing
  const fetchBracket = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get(`/brackets/tournament/${tournamentId}`);
      setBracket(response.data.data.bracket_data);
    } catch (err) {
      console.error('Error fetching bracket:', err);
      setError('Failed to load bracket.');
    } finally {
      setLoading(false);
    }
  }, [tournamentId]);

  // Call fetchBracket when the component mounts or when tournamentId changes
  useEffect(() => {
    fetchBracket();
  }, [fetchBracket]);

  // Save the bracket updates to the server
  const handleSaveBracket = async () => {
    setLoading(true);
    try {
      await API.put(`/brackets/${tournamentId}`, { bracket_data: bracket });
      setSuccessMessage('Bracket updated successfully.');
    } catch (err) {
      console.error('Error updating bracket:', err);
      setError('Failed to update bracket.');
    } finally {
      setLoading(false);
    }
  };

  // Handle participant updates in the bracket
  const handleParticipantChange = (category, roundIndex, matchIndex, playerKey, newParticipant) => {
    const updatedBracket = { ...bracket };
    updatedBracket[category].rounds[roundIndex].matches[matchIndex][playerKey] = newParticipant;
    setBracket(updatedBracket);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Edit Bracket
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {bracket && (
        <Box>
          {Object.keys(bracket).map((category) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6">{category} Bracket</Typography>
              {bracket[category].rounds.map((round, roundIndex) => (
                <Box key={roundIndex} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Round {round.round}</Typography>
                  {round.matches.map((match, matchIndex) => (
                    <Box key={matchIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TextField
                        label="Player 1"
                        value={match.player1?.name || ''}
                        onChange={(e) =>
                          handleParticipantChange(
                            category,
                            roundIndex,
                            matchIndex,
                            'player1',
                            { ...match.player1, name: e.target.value }
                          )
                        }
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="body1">vs</Typography>
                      <TextField
                        label="Player 2"
                        value={match.player2?.name || ''}
                        onChange={(e) =>
                          handleParticipantChange(
                            category,
                            roundIndex,
                            matchIndex,
                            'player2',
                            { ...match.player2, name: e.target.value }
                          )
                        }
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={handleSaveBracket}>
            Save Bracket
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default EditBracketPage;

