// src/components/Auth/Register.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

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
      const response = await API.post('/auth/register', { email, password });

      setSuccess('Registration successful! You can now log in.');

      // Optionally, automatically log in the user
      // Uncomment the following lines if you wish to log in immediately after registration
      /*
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setAuth({
        isAuthenticated: true,
        role: user.role,
      });
      navigate('/dashboard');
      */

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
        const validationErrors = err.response.data.errors.map((err) => err.msg).join(' ');
        setError(validationErrors);
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
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Button component="span" onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;

