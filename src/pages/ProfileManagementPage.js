// src/pages/ProfileManagementPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import API from '../utils/api';
import ProfileForm from '../components/Profiles/ProfileForm';
import ProfileList from '../components/Profiles/ProfileList';

const ProfileManagementPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addProfileOpen, setAddProfileOpen] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await API.get('/profiles');
      setProfiles(response.data.data);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load profiles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleAddProfileSuccess = () => {
    setAddProfileOpen(false);
    fetchProfiles();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Profiles
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddProfileOpen(true)}
        sx={{ mb: 2 }}
      >
        Add New Profile
      </Button>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ProfileList profiles={profiles} refreshProfiles={fetchProfiles} />
      )}
      {/* Add Profile Dialog */}
      <Dialog
        open={addProfileOpen}
        onClose={() => setAddProfileOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Profile</DialogTitle>
        <DialogContent>
          <ProfileForm
            onSuccess={handleAddProfileSuccess}
            onCancel={() => setAddProfileOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProfileManagementPage;

