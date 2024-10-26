// src/components/Admin/TournamentManagement.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Alert,
  TableContainer,
  Paper,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import API from '../../utils/api';

const TournamentManagement = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editTournament, setEditTournament] = useState(null);
  const [deleteTournament, setDeleteTournament] = useState(null);
  const [addTournamentOpen, setAddTournamentOpen] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    max_tickets: '',
    price: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const response = await API.get('/tournaments');
      setTournaments(response.data.data);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleEdit = (tournament) => {
    setEditTournament(tournament);
  };

  const handleDelete = (tournament) => {
    setDeleteTournament(tournament);
  };

  const handleUpdateTournament = async () => {
    try {
      await API.put(`/tournaments/${editTournament.tournament_id}`, {
        name: editTournament.name,
        description: editTournament.description,
        date: editTournament.date,
        location: editTournament.location,
        max_tickets: editTournament.max_tickets,
        price: editTournament.price,
      });
      setSuccessMessage('Tournament updated successfully.');
      setEditTournament(null);
      fetchTournaments();
    } catch (err) {
      console.error('Update Tournament Error:', err);
      setError('Failed to update tournament. Please try again.');
    }
  };

  const confirmDeleteTournament = async () => {
    try {
      await API.delete(`/tournaments/${deleteTournament.tournament_id}`);
      setSuccessMessage('Tournament deleted successfully.');
      setDeleteTournament(null);
      fetchTournaments();
    } catch (err) {
      console.error('Delete Tournament Error:', err);
      setError('Failed to delete tournament. Please try again.');
    }
  };

  const handleAddTournament = async () => {
    try {
      await API.post('/tournaments', newTournament);
      setSuccessMessage('Tournament added successfully.');
      setAddTournamentOpen(false);
      setNewTournament({
        name: '',
        description: '',
        date: '',
        location: '',
        max_tickets: '',
        price: '',
      });
      fetchTournaments();
    } catch (err) {
      console.error('Add Tournament Error:', err);
      setError('Failed to add tournament. Please try again.');
    }
  };

  return (
    <>
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setAddTournamentOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Tournament
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="tournament management table">
            <TableHead>
              <TableRow>
                <TableCell>Tournament ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow key={tournament.tournament_id}>
                  <TableCell>{tournament.tournament_id}</TableCell>
                  <TableCell>{tournament.name}</TableCell>
                  <TableCell>
                    {new Date(tournament.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{tournament.location}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(tournament)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(tournament)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Add Tournament Dialog */}
      <Dialog
        open={addTournamentOpen}
        onClose={() => setAddTournamentOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Tournament</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newTournament.name}
            onChange={(e) =>
              setNewTournament({ ...newTournament, name: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newTournament.description}
            onChange={(e) =>
              setNewTournament({ ...newTournament, description: e.target.value })
            }
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={newTournament.date}
            onChange={(e) =>
              setNewTournament({ ...newTournament, date: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newTournament.location}
            onChange={(e) =>
              setNewTournament({ ...newTournament, location: e.target.value })
            }
          />
          <TextField
            label="Max Tickets"
            type="number"
            fullWidth
            margin="normal"
            value={newTournament.max_tickets}
            onChange={(e) =>
              setNewTournament({ ...newTournament, max_tickets: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={newTournament.price}
            onChange={(e) =>
              setNewTournament({ ...newTournament, price: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddTournamentOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddTournament}>
            Add Tournament
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Tournament Dialog */}
      {editTournament && (
        <Dialog
          open={Boolean(editTournament)}
          onClose={() => setEditTournament(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Tournament</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editTournament.name}
              onChange={(e) =>
                setEditTournament({ ...editTournament, name: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={editTournament.description}
              onChange={(e) =>
                setEditTournament({ ...editTournament, description: e.target.value })
              }
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              value={editTournament.date}
              onChange={(e) =>
                setEditTournament({ ...editTournament, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Location"
              fullWidth
              margin="normal"
              value={editTournament.location}
              onChange={(e) =>
                setEditTournament({ ...editTournament, location: e.target.value })
              }
            />
            <TextField
              label="Max Tickets"
              type="number"
              fullWidth
              margin="normal"
              value={editTournament.max_tickets}
              onChange={(e) =>
                setEditTournament({ ...editTournament, max_tickets: e.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={editTournament.price}
              onChange={(e) =>
                setEditTournament({ ...editTournament, price: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTournament(null)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleUpdateTournament}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Delete Tournament Confirmation Dialog */}
      {deleteTournament && (
        <Dialog
          open={Boolean(deleteTournament)}
          onClose={() => setDeleteTournament(null)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete tournament{' '}
              <strong>{deleteTournament.name}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteTournament(null)}>No</Button>
            <Button color="error" onClick={confirmDeleteTournament}>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default TournamentManagement;

