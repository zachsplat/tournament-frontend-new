// src/App.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import BracketPage from './pages/BracketPage';
import GenerateBracketPage from './pages/Admin/GenerateBracketPage';
import EditBracketPage from './pages/Admin/EditBracketPage';
import ProfileManagementPage from './pages/ProfileManagementPage';
import TicketManagementPage from './pages/TicketManagementPage';
import PurchaseTicketPage from './pages/PurchaseTicketPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!auth.isAuthenticated && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {auth.isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profiles" element={<ProfileManagementPage />} />
            <Route path="/tickets" element={<TicketManagementPage />} />
            <Route path="/purchase-ticket/:id" element={<PurchaseTicketPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
            <Route path="/tournaments/:tournamentId/bracket" element={<BracketPage />} />
            <Route path="/admin/tournaments/:tournamentId/generate-bracket" element={<GenerateBracketPage />} />
            {auth.role === 'admin' && (
              <>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/tournaments/:tournamentId/edit-bracket" element={<EditBracketPage />} />
                {/* Add more admin routes here */}
              </>
            )}
          </>
        )}
        {/* Redirect to home if route not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
