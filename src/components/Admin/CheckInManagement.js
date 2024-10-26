// src/components/Admin/CheckInManagement.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Alert,
  Typography,
  CircularProgress,
} from '@mui/material';
import QrReader from 'react-qr-scanner';
import API from '../../utils/api';

const CheckInManagement = () => {
  const [qrData, setQrData] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = async (data) => {
    if (data) {
      setQrData(data);
      setShowScanner(false);
      await handleCheckIn(data);
    }
  };

  const handleError = (err) => {
    console.error('QR Scan Error:', err);
    setError('Error accessing camera. Please ensure it is not being used by another application.');
  };

  const handleCheckIn = async (qrData) => {
    setLoading(true);
    setError('');
    setScanResult(null);

    try {
      const response = await API.post('/admin/checkin', { qr_data: qrData });
      setScanResult(response.data);
    } catch (err) {
      console.error('Check-In Error:', err);
      setError(
        err.response?.data?.error ||
        err.message ||
        'An unexpected error occurred during check-in.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheckIn = async () => {
    if (!qrData) {
      setError('Please enter or scan QR data.');
      return;
    }
    await handleCheckIn(qrData);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Participant Check-In
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {scanResult && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {scanResult.message}
        </Alert>
      )}
      {loading && (
        <CircularProgress sx={{ mb: 2 }} />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowScanner(!showScanner)}
        sx={{ mb: 2 }}
      >
        {showScanner ? 'Close Scanner' : 'Open QR Scanner'}
      </Button>
      {showScanner && (
        <Box sx={{ mb: 2 }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </Box>
      )}
      <TextField
        label="QR Data"
        fullWidth
        margin="normal"
        value={qrData}
        onChange={(e) => setQrData(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleManualCheckIn}
        disabled={loading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CheckInManagement;

