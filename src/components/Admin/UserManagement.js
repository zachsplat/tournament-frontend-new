// src/components/Admin/UserManagement.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  TableContainer,
  Paper,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import API from '../../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get('/admin/users');
      setUsers(response.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = (user) => {
    setDeleteUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      await API.put(`/admin/users/${editUser.user_id}`, {
        email: editUser.email,
        role: editUser.role,
      });
      setSuccessMessage('User updated successfully.');
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Update User Error:', err);
      setError('Failed to update user. Please try again.');
    }
  };

  const confirmDeleteUser = async () => {
    try {
      await API.delete(`/admin/users/${deleteUser.user_id}`);
      setSuccessMessage('User deleted successfully.');
      setDeleteUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Delete User Error:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="user management table">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(user)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(user)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Edit User Dialog */}
      {editUser && (
        <Dialog
          open={Boolean(editUser)}
          onClose={() => setEditUser(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={editUser.role}
                label="Role"
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditUser(null)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleUpdateUser}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Delete User Confirmation Dialog */}
      {deleteUser && (
        <Dialog
          open={Boolean(deleteUser)}
          onClose={() => setDeleteUser(null)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete user{' '}
              <strong>{deleteUser.email}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteUser(null)}>No</Button>
            <Button color="error" onClick={confirmDeleteUser}>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default UserManagement;

