// src/components/Admin/GenerateBracket.js
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Alert, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField 
} from '@mui/material';
import API from '../../utils/api';

const GenerateBracket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGenerateBracket = async () => {
    if (!tournamentId) {
      setError('Tournament ID is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await API.post(`/admin/tournaments/${tournamentId}/bracket`);
      setSuccess(`Bracket generated successfully. View it at: ${response.data.public_url}`);
      setDialogOpen(false);
      setTournamentId('');
    } catch (err) {
      console.error('Generate Bracket Error:', err);
      setError(err.response?.data?.error || 'Failed to generate bracket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Generate Tournament Bracket
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
        Generate Bracket
      </Button>

      {/* Dialog for entering Tournament ID */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Enter Tournament ID</DialogTitle>
        <DialogContent>
          <TextField
            label="Tournament ID"
            type="number"
            fullWidth
            required
            margin="normal"
            value={tournamentId}
            onChange={(e) => setTournamentId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleGenerateBracket} 
            variant="contained" 
            color="primary" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GenerateBracket;

