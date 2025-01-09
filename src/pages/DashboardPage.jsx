import React from 'react';
import { Box } from '@mui/material';
import Dashboard from '../components/Dashboard';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import Footer from '../components/Footer';

const DashboardPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, p: 3 }}>
        <Dashboard />
        <StockForm />
        <StockList />
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage; 