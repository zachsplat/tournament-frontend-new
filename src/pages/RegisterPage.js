// src/pages/RegisterPage.js
import React, { useState } from 'react';
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
import API from '../utils/api';

const RegisterPage = () => {
  const navigate = useNavigate();

  // State variables for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic front-end validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await API.post('/auth/register', { email, password });

      setSuccess('Registration successful! You can now log in.');
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration Error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.response && err.response.data && err.response.data.errors) {
        // Handle validation errors from backend
        const validationErrors = err.response.data.errors
          .map((error) => error.msg)
          .join(' ');
        setError(validationErrors);
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
          Register
        </Typography>
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
            autoComplete="new-password"
            helperText="Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;

