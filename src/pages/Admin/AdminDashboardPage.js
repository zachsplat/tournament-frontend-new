// src/pages/Admin/AdminDashboardPage.js
import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import UserManagement from '../../components/Admin/UserManagement';
import TournamentManagement from '../../components/Admin/TournamentManagement';
import CheckInManagement from '../../components/Admin/CheckInManagement';
import BracketManagement from '../../components/Admin/BracketManagement';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboardPage = () => {
  const [tabValue, setTabValue] = useState('users');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="User Management" value="users" />
        <Tab label="Tournament Management" value="tournaments" />
        <Tab label="Check-In" value="checkin" />
        <Tab label="Bracket Management" value="brackets" />
      </Tabs>
      <Box>
        {tabValue === 'users' && <UserManagement />}
        {tabValue === 'tournaments' && <TournamentManagement />}
        {tabValue === 'checkin' && <CheckInManagement />}
        {tabValue === 'brackets' && <BracketManagement />}
      </Box>
    </Container>
  );
};

export default AdminDashboardPage;

