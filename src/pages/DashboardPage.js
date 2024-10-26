// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Button } from '@mui/material';
import API from '../utils/api';
import TournamentCard from '../components/Dashboard/TournamentCard';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Fetch available tournaments from the backend
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await API.get('/tournaments');
        setTournaments(response.data.tournaments);
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setError('Failed to load tournaments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" color="primary" onClick={() => navigate('/profiles')}>
          Manage Profiles
        </Button>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Available Tournaments
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <Grid item key={tournament.tournament_id} xs={12} sm={6} md={4}>
                <TournamentCard tournament={tournament} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No tournaments available at the moment.</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default DashboardPage;

