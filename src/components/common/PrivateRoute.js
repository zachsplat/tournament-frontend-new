// src/components/common/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, admin }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (admin && auth.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;

