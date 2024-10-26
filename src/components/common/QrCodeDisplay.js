// src/components/common/QrCodeDisplay.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import QRCode from 'qrcode.react';

const QrCodeDisplay = ({ qrData }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Your QR Code
      </Typography>
      <QRCode value={qrData} size={256} />
    </Box>
  );
};

export default QrCodeDisplay;

