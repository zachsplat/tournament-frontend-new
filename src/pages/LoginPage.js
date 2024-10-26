// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import API from '../utils/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  // State variables for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/auth/login', { email, password });

      // Assuming the backend returns a token and user info
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Update auth context
      setAuth({ isAuthenticated: true, role: user.role });

      // Redirect to Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;

