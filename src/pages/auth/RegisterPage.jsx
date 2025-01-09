import React from 'react';
import { Box } from '@mui/material';
import Register from '../../components/auth/Register';
import Footer from '../../components/Footer';

const RegisterPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Register />
      </Box>
      <Footer />
    </Box>
  );
};

export default RegisterPage; 