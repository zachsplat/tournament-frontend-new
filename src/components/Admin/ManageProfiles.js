// src/components/Admin/ManageProfiles.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';

const ManageProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get('/admin/users'); // Ensure this matches backend routes
      setProfiles(response.data.data);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load profiles.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = (profileId) => {
    navigate(`/admin/profiles/edit/${profileId}`);
  };

  const handleDeleteProfile = async (profileId) => {
    if (!window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      return;
    }

    try {
      await API.delete(`/admin/users/${profileId}`);
      fetchProfiles();
    } catch (err) {
      console.error('Delete Profile Error:', err);
      setDeleteError('Failed to delete profile.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Profiles
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {deleteError && <Alert severity="error" sx={{ mb: 2 }}>{deleteError}</Alert>}
      <Grid container spacing={3}>
        {profiles.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.profile_id}>
            <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
              <img src={profile.avatar || '/default-avatar.png'} alt={profile.name} width={100} height={100} style={{ borderRadius: '50%' }} />
              <Typography variant="h6" gutterBottom>
                {profile.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {profile.bio || 'No bio available.'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" color="primary" onClick={() => handleEditProfile(profile.user_id)} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteProfile(profile.user_id)}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {profiles.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No profiles found.
        </Typography>
      )}
    </Container>
  );
};

export default ManageProfiles;

