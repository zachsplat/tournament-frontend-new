// src/components/Admin/ManageTournaments.js
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import TournamentForm from './TournamentForm';
import API from '../../utils/api';

const ManageTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editTournament, setEditTournament] = useState(null);
  const [addTournamentOpen, setAddTournamentOpen] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/tournaments'); // Ensure route matches backend
      setTournaments(response.data.tournaments);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tournament) => {
    setEditTournament(tournament);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tournament? This action cannot be undone.')) {
      return;
    }

    try {
      await API.delete(`/tournaments/${id}`); // Ensure the API route matches
      fetchTournaments();
    } catch (err) {
      console.error('Error deleting tournament:', err);
      setDeleteError('Failed to delete tournament.');
    }
  };

  const handleFormSuccess = () => {
    setAddTournamentOpen(false);
    setEditTournament(null);
    fetchTournaments();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Button variant="contained" color="primary" onClick={() => setAddTournamentOpen(true)}>
        Add New Tournament
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError}</Alert>}
      <List sx={{ mt: 2 }}>
        {tournaments.map((tournament) => (
          <ListItem key={tournament.tournament_id}>
            <ListItemText
              primary={tournament.name}
              secondary={`Date: ${new Date(tournament.date).toLocaleDateString()}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(tournament)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(tournament.tournament_id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {tournaments.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No tournaments available.
        </Typography>
      )}
      {/* Add/Edit Tournament Dialog */}
      {(addTournamentOpen || editTournament) && (
        <Dialog
          open={Boolean(addTournamentOpen || editTournament)}
          onClose={() => {
            setAddTournamentOpen(false);
            setEditTournament(null);
          }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{editTournament ? 'Edit Tournament' : 'Add Tournament'}</DialogTitle>
          <DialogContent>
            <TournamentForm
              existingTournament={editTournament}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setAddTournamentOpen(false);
                setEditTournament(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ManageTournaments;

