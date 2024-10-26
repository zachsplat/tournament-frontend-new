// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { isAuthenticated, getUserRole } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: isAuthenticated(),
    role: getUserRole(),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        isAuthenticated: isAuthenticated(),
        role: getUserRole(),
      });
    };

    window.addEventListener('storage', handleStorageChange);

    // Polling to handle in-app token changes
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

