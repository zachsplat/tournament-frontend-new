// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Box,
} from '@mui/material';
import API from '../utils/api';
import TournamentCard from '../components/Tournaments/TournamentCard';

const Dashboard = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTournaments = async (currentPage) => {
    setLoading(true);
    try {
      const response = await API.get('/tournaments', {
        params: { page: currentPage, limit: 9 },
      });
      setTournaments(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Tournaments
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {tournaments.map((tournament) => (
              <Grid item key={tournament.tournament_id} xs={12} sm={6} md={4}>
                <TournamentCard tournament={tournament} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Dashboard;

