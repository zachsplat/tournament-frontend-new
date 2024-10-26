// src/pages/Home.js
import React from 'react';
import { Box } from '@mui/material';
import heroImage from '../assets/images/hero-image.png';

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)', // Adjust for AppBar height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

    </Box>
  );
};

export default Home;

