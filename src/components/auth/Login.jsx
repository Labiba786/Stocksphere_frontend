import React from 'react';
import {
  Grid,
 Typography,
  Box,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Assessment,
} from '@mui/icons-material';

const stockImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80";

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <Card
    elevation={3}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: `linear-gradient(45deg, ${color}15, ${color}08)`,
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Typography variant="h6" component="h2" color="text.secondary">
        {title}
      </Typography>
      <Icon sx={{ color: color }} />
    </Box>
    <Typography variant="h4" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
      {value}
    </Typography>
  </Card>
);

const Dashboard = ({ totalValue, totalStocks, bestPerformer, worstPerformer }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Format values
  const formattedTotalValue = typeof totalValue === 'number' 
    ? `₹${totalValue.toFixed(2)}` 
    : '₹0.00';
  
  const formattedTotalStocks = totalStocks || 0;
  const formattedBestPerformer = bestPerformer || 'N/A';
  const formattedWorstPerformer = worstPerformer || 'N/A';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Portfolio Overview
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Value"
            value={formattedTotalValue}
            icon={AccountBalance}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Stocks"
            value={formattedTotalStocks}
            icon={Assessment}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Best Performer"
            value={formattedBestPerformer}
            icon={TrendingUp}
            color="#00C853"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Worst Performer"
            value={formattedWorstPerformer}
            icon={TrendingDown}
            color="#FF5252"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;