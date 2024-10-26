// src/components/Admin/ScanQRPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import API from '../../utils/api';

const ScanQRPage = () => {
  const [scanStatus, setScanStatus] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      /* verbose= */ false
    );

    scanner.render(
      async (decodedText, decodedResult) => {
        setScanStatus('Processing...');
        setProcessing(true);
        await handleScan(decodedText);
        setProcessing(false);
        setScanStatus('');
        scanner.clear();
      },
      (errorMessage) => {
        // Optionally handle scan errors
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  const handleScan = async (decodedText) => {
    try {
      const response = await API.post('/admin/scan-qr', { qr_data: decodedText });
      setResult(`Check-in successful for Ticket ID: ${response.data.data.ticket_id}`);
    } catch (err) {
      console.error('QR Scan Error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setResult(`Error: ${err.response.data.error}`);
      } else {
        setResult('An unexpected error occurred during check-in.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Scan QR Code for Check-in
      </Typography>
      <Box id="qr-reader" sx={{ mt: 4 }}>
        {/* QR Scanner will be rendered here */}
        {scanStatus && <CircularProgress sx={{ mt: 2 }} />}
      </Box>
      {result && <Alert severity={result.startsWith('Error') ? 'error' : 'success'} sx={{ mt: 4 }}>{result}</Alert>}
      <Alert severity="info" sx={{ mt: 4 }}>
        Point your device's camera at the participant's QR code to check them in.
      </Alert>
    </Container>
  );
};

export default ScanQRPage;

