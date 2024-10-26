// src/components/Tournaments/TournamentCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/images/tournament-placeholder.jpg';

const TournamentCard = ({ tournament }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tournaments/${tournament.tournament_id}`);
  };

  const handleBuyTickets = () => {
    navigate(`/purchase-ticket/${tournament.tournament_id}`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={placeholderImage}
        alt={`${tournament.name} image`}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {tournament.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tournament.description.length > 100
            ? `${tournament.description.substring(0, 100)}...`
            : tournament.description}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Date: {new Date(tournament.date).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Location: {tournament.location}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Tickets Available: {tournament.max_tickets - tournament.sold_tickets}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Price: ${tournament.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto' }}>
        <Button size="small" onClick={handleViewDetails}>
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleBuyTickets}
        >
          Buy Tickets
        </Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;

