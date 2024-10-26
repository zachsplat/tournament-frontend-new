// src/components/Admin/QRCodeCheckIn.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import API from '../../utils/api';

const QRCodeCheckIn = () => {
  const [qrData, setQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCheckIn = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/admin/check-in', { qr_data: qrData });
      setSuccess(`Check-in successful for ticket ID: ${response.data.ticket_id}`);
      setQrData('');
    } catch (err) {
      console.error('QR Check-In Error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Error: ${err.response.data.error}`);
      } else {
        setError('Failed to check in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        QR Code Check-In
      </Typography>
      <TextField
        label="Enter QR Code Data"
        fullWidth
        required
        margin="normal"
        value={qrData}
        onChange={(e) => setQrData(e.target.value)}
      />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      <Button variant="contained" color="primary" onClick={handleCheckIn} disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Check In'}
      </Button>
    </Box>
  );
};

export default QRCodeCheckIn;

