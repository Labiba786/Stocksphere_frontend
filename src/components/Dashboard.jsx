import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  ButtonGroup,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Assessment,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: `linear-gradient(45deg, ${color}15, ${color}08)`,
      borderLeft: `4px solid ${color}`,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 24px ${color}20`,
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
  </Paper>
);

const Dashboard = ({ totalValue, totalStocks, bestPerformer, worstPerformer }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [timeRange, setTimeRange] = useState('1M');

  // Formatcurrency helper
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '₹0.00';
    return `₹${Number(value).toFixed(2)}`;
  };

  // Dynamic gradient for line chart
  const gradientFill = (context) => {
    if (context?.chart?.ctx) {
      const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, `${theme.palette.primary.main}40`);
      gradient.addColorStop(1, `${theme.palette.primary.main}00`);
      return gradient;
    }
    return `${theme.palette.primary.main}40`;
  };

  // Sample data for line chart with dynamic time ranges
  const getLineChartData = () => {
    const ranges = {
      '1D': { points: 24, format: 'HH:mm' },
      '1W': { points: 7, format: 'ddd' },
      '1M': { points: 30, format: 'DD' },
      '1Y': { points: 12, format: 'MMM' },
    };

    const range = ranges[timeRange];
    const labels = Array.from({ length: range.points }, (_, i) => i);
    const baseValue = Number(totalValue) || 10000;
    const volatility = 0.05;

    return {
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data: labels.map(() => 
            baseValue * (1 + (Math.random() - 0.5) * volatility)
          ),
          borderColor: theme.palette.primary.main,
          backgroundColor: (context) => {
            if (!context?.chart?.ctx) return theme.palette.primary.main + '40';
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, theme.palette.primary.main + '40');
            gradient.addColorStop(1, theme.palette.primary.main + '00');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 6,
          pointBackgroundColor: theme.palette.primary.main,
          pointHoverBackgroundColor: theme.palette.primary.light,
          pointBorderColor: 'white',
          pointHoverBorderColor: 'white',
        },
      ],
    };
  };

  // Enhanced pie chart data
  const pieChartData = {
    labels: ['Technology', 'Finance', 'Healthcare', 'Consumer', 'Energy'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(33, 150, 243, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 64, 129, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(33, 150, 243, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(255, 64, 129, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 2,
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme.palette.text.primary,
          font: {
            family: "'Ubuntu', sans-serif",
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? 'white' : 'black',
        bodyColor: isDarkMode ? 'white' : 'black',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            // Safe handling of undefined values
            if (!context || !context.parsed || typeof context.parsed.y === 'undefined') {
              return 'No data';
            }
            return formatCurrency(context.parsed.y);
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme.palette.text.primary,
          font: {
            family: "'Ubuntu', sans-serif",
          },
          callback: (value) => formatCurrency(value),
        },
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme.palette.text.primary,
          font: {
            family: "'Ubuntu', sans-serif",
          },
        },
      },
    },
  };

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
      
      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
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

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Value Trend</Typography>
                <ButtonGroup 
                  size="small"
                  sx={{
                    '& .MuiButton-root': {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&.active': {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      },
                    },
                  }}
                >
                  {['1D', '1W', '1M', '1Y'].map((range) => (
                    <Button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={timeRange === range ? 'active' : ''}
                    >
                      {range}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
              <Box sx={{ height: 300 }}>
                <Line data={getLineChartData()} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>Sector Distribution</Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={pieChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
