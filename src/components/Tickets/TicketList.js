// src/components/Tickets/TicketList.js
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Tooltip,
  Typography,
} from '@mui/material';
import { Info, Cancel } from '@mui/icons-material';
import TicketDetails from './TicketDetails';
import API from '../../utils/api';

const TicketList = ({ tickets, refreshTickets }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCancel = (ticket) => {
    setTicketToCancel(ticket);
    setCancelConfirmOpen(true);
  };

  const confirmCancel = async () => {
    try {
      await API.post(`/tickets/${ticketToCancel.ticket_id}/cancel`);
      setSuccess('Ticket canceled successfully.');
      setCancelConfirmOpen(false);
      refreshTickets();
    } catch (err) {
      console.error('Cancel Ticket Error:', err);
      setError('Failed to cancel ticket. Please try again.');
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <List>
        {tickets.map((ticket) => (
          <ListItem key={ticket.ticket_id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{ticket.Tournament.name.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={ticket.Tournament.name}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(ticket.Tournament.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Typography>
                </>
              }
            />
            <Tooltip title="View Details">
              <IconButton edge="end" onClick={() => handleViewDetails(ticket)}>
                <Info />
              </IconButton>
            </Tooltip>
            {ticket.status === 'purchased' && (
              <Tooltip title="Cancel Ticket">
                <IconButton edge="end" onClick={() => handleCancel(ticket)}>
                  <Cancel />
                </IconButton>
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
      {/* Ticket Details Dialog */}
      {selectedTicket && (
        <Dialog
          open={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Ticket Details</DialogTitle>
          <DialogContent>
            <TicketDetails ticket={selectedTicket} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedTicket(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your ticket for{' '}
            <strong>{ticketToCancel?.Tournament.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelConfirmOpen(false)}>No</Button>
          <Button color="error" onClick={confirmCancel}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TicketList;

