// src/components/Dashboard/TournamentCard.js
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TournamentCard = ({ tournament }) => {
  const navigate = useNavigate();

  const handleBuyTickets = () => {
    // Navigate to the existing Purchase Ticket route
    navigate(`/purchase-ticket/${tournament.tournament_id}`);
  };

  const handleViewDetails = () => {
    navigate(`/tournaments/${tournament.tournament_id}`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {tournament.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tournament.description.substring(0, 100)}...
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Date: {new Date(tournament.date).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Location: {tournament.location}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Available Tickets: {tournament.max_tickets}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Price: ${tournament.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto' }}>
        <Button size="small" onClick={handleViewDetails}>View Details</Button>
        <Button size="small" variant="contained" color="primary" onClick={handleBuyTickets}>
          Buy Tickets
        </Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;

