// src/components/Tickets/TicketDetails.js
import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const TicketDetails = ({ ticket }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {ticket.Tournament.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Date: {new Date(ticket.Tournament.date).toLocaleDateString()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Location: {ticket.Tournament.location}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Status: {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {ticket.status === 'purchased' && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            Your QR Code
          </Typography>
          <QRCodeCanvas value={ticket.QRCodeSVG} size={200} />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Present this QR code at the event for check-in.
          </Typography>
        </Box>
      )}
      {ticket.status === 'checked_in' && (
        <Typography variant="body1" color="success.main">
          You have successfully checked in for this event!
        </Typography>
      )}
      {ticket.status === 'canceled' && (
        <Typography variant="body1" color="error.main">
          This ticket has been canceled.
        </Typography>
      )}
    </Box>
  );
};

export default TicketDetails;
