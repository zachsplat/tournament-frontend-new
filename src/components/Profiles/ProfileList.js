// src/components/Profiles/ProfileList.js
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ProfileForm from './ProfileForm';
import API from '../../utils/api';

const ProfileList = ({ profiles, refreshProfiles }) => {
  const [editProfile, setEditProfile] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  const handleEdit = (profile) => {
    setEditProfile(profile);
  };

  const handleDelete = async (profile) => {
    try {
      await API.delete(`/profiles/${profile.profile_id}`);
      setDeleteSuccess('Profile deleted successfully.');
      refreshProfiles();
    } catch (err) {
      console.error('Delete Profile Error:', err);
      setDeleteError('Failed to delete profile. Please try again.');
    }
  };

  const handleFormSuccess = () => {
    setEditProfile(null);
    refreshProfiles();
  };

  return (
    <>
      {deleteError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {deleteError}
        </Alert>
      )}
      {deleteSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {deleteSuccess}
        </Alert>
      )}
      <List>
        {profiles.map((profile) => (
          <ListItem key={profile.profile_id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={profile.avatar} alt={profile.name}>
                {profile.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={profile.name}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {profile.category}
                  </Typography>
                  {' — '}
                  {profile.bio || 'No bio available.'}
                </>
              }
            />
            <Box>
              <Tooltip title="Edit">
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(profile)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(profile)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </ListItem>
        ))}
      </List>
      {editProfile && (
        <Dialog
          open={Boolean(editProfile)}
          onClose={() => setEditProfile(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <ProfileForm
              existingProfile={editProfile}
              onSuccess={handleFormSuccess}
              onCancel={() => setEditProfile(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProfileList;

