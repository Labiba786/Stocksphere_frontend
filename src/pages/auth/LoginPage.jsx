import React from 'react';
import { Box } from '@mui/material';
import Login from '../../components/auth/Login';
import Footer from '../../components/Footer';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Login />
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginPage; 