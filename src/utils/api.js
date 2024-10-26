// src/utils/api.js
import axios from 'axios';
import { getToken, logout } from './auth';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 100000,
});

// Request interceptor to add the token to headers
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration and errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token expired or unauthorized access
      if (error.response.status === 401) {
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;

