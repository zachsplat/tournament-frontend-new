// src/pages/Admin/ViewBracketsPage.js
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography,  
  CircularProgress, 
  Alert, 
  Grid, 
  Card, 
  CardContent, 
  Button 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';

const ViewBracketsPage = () => {
  const [brackets, setBrackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrackets = async () => {
      try {
        const response = await API.get('/admin/brackets'); // Ensure this matches your backend routes
        setBrackets(response.data.brackets); // Adjust based on actual response structure
      } catch (err) {
        console.error('Error fetching brackets:', err);
        setError('Failed to load brackets.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrackets();
  }, []);

  const handleViewBracket = (bracketId) => {
    navigate(`/bracket/${bracketId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Tournament Brackets
      </Typography>
      {brackets.length === 0 ? (
        <Typography variant="h6">No brackets available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {brackets.map((bracket) => (
            <Grid item xs={12} sm={6} md={4} key={bracket.bracket_id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Tournament ID: {bracket.tournament_id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Bracket ID: {bracket.bracket_id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Generated on: {new Date(bracket.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => handleViewBracket(bracket.bracket_id)}
                  >
                    View Bracket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ViewBracketsPage;

