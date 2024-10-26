// src/utils/auth.js

// Helper functions for authentication

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get user role from token payload
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
};

// Login function to store token
export const login = (token) => {
  localStorage.setItem('token', token);
};

// Logout function to remove token
export const logout = () => {
  localStorage.removeItem('token');
};

// Check if user is admin
export const isAdmin = () => {
  return getUserRole() === 'admin';
};

