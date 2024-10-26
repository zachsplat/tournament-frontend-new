// src/components/Profiles/ProfileForm.js
import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Alert,
  Box,
  MenuItem,
} from '@mui/material';
import API from '../../utils/api';

const validCategories = ['Youth', 'Teen Male', 'Teen Female', 'Adult Male', 'Adult Female'];

const ProfileForm = ({ existingProfile, onSuccess, onCancel }) => {
  const [name, setName] = useState(existingProfile?.name || '');
  const [bio, setBio] = useState(existingProfile?.bio || '');
  const [category, setCategory] = useState(existingProfile?.category || 'Adult Male');
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState('');

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('category', category);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      if (existingProfile) {
        await API.put(`/profiles/${existingProfile.profile_id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await API.post('/profiles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      onSuccess();
    } catch (err) {
      console.error('Profile Form Error:', err);
      setError(
        err.response?.data?.error ||
          'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Name"
        fullWidth
        required
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        select
        label="Category"
        fullWidth
        required
        margin="normal"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {validCategories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Bio"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Avatar
        <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
      </Button>
      {avatarFile && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected file: {avatarFile.name}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {existingProfile ? 'Save Changes' : 'Create Profile'}
        </Button>
        <Button onClick={onCancel} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;

