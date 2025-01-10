import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
} from '@mui/material';
import {
  ShowChart,
  Security,
  Speed,
  Analytics,
  Timeline,
  Devices,
  People,
  StarBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Line } from 'react-chartjs-2';
import Footer from '../components/Footer';

const AnimatedChart = () => {
  const theme = useTheme();
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Growth',
        data: [10000, 15000, 13000, 18000, 16000, 22000, 25000, 24000, 30000, 32000, 35000, 40000],
        borderColor: theme.palette.primary.main,
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, `${theme.palette.primary.main}40`);
          gradient.addColorStop(1, `${theme.palette.primary.main}00`);
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `₹${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
          callback: (value) => `₹${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 250, sm: 300, md: 400 },
        width: '100%',
        background: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(255, 255, 255, 0.9)',
        borderRadius: { xs: 2, md: 4 },
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        p: { xs: 2, md: 3 },
      }}
    >
      <Line data={data} options={options} />
    </Box>
  );
};

const TestimonialCard = ({ name, role, comment, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Box
      sx={{
        p: { xs: 2.5, md: 4 },
        height: '100%',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        backdropFilter: 'blur(20px)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 2, 
          fontStyle: 'italic',
          fontSize: { xs: '0.875rem', md: '1rem' },
          lineHeight: 1.6
        }}
      >
        "{comment}"
      </Typography>
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '1rem', md: '1.1rem' }
        }}
      >
        {name}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
      >
        {role}
      </Typography>
    </Box>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        height: '100%',
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Icon sx={{ 
          fontSize: { xs: 36, md: 48 }, 
          color: 'primary.main', 
          mb: { xs: 1.5, md: 2 } 
        }} />
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 600,
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.875rem', md: '1rem' },
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        textAlign: 'center',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Icon sx={{ 
        fontSize: { xs: 32, md: 40 }, 
        color: 'primary.main', 
        mb: { xs: 1, md: 1.5 } 
      }} />
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 0.5, 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }}
      >
        {value}
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
      >
        {label}
      </Typography>
    </Box>
  </motion.div>
);

const HomePage = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: ShowChart,
      title: "Real-time Tracking",
      description: "Monitor your investments with live updates and advanced analytics",
    },
    {
      icon: Analytics,
      title: "Smart Analytics",
      description: "Get insights and recommendations based on your portfolio performance",
    },
    {
      icon: Security,
      title: "Bank-grade Security",
      description: "Your data is protected with enterprise-level encryption",
    },
    {
      icon: Speed,
      title: "Lightning Fast",
      description: "Experience rapid updates and seamless performance",
    },
    {
      icon: Timeline,
      title: "Historical Analysis",
      description: "Track your investment journey with detailed historical data",
    },
    {
      icon: Devices,
      title: "Cross-platform",
      description: "Access your portfolio from any device, anywhere",
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Professional Investor",
      comment: "The best portfolio tracking app I've ever used. It's transformed how I manage my investments.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Day Trader",
      comment: "Incredible analytics and insights. This platform has helped me make better investment decisions.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Financial Advisor",
      comment: "A must-have tool for any serious investor. The real-time tracking is exceptional.",
      rating: 5,
    },
  ];
  
  return (
    <Box sx={{ 
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 'auto', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
            : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
          pt: { xs: '100px', sm: '120px', md: '64px' },
          pb: { xs: 6, sm: 8, md: '64px' },
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative', 
            zIndex: 2,
            px: { xs: 2, sm: 3, md: 3 }
          }}
        >
          <Grid 
            container 
            spacing={{ xs: 4, md: 8 }} 
            alignItems="center"
            direction={{ xs: 'column-reverse', md: 'row' }}
          >
            {/* Text Content */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                mt: { xs: 2, md: 0 }
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Stocksphere
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ 
                    mb: 4, 
                    color: theme.palette.text.primary,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                  }}
                >
                  Your Smart Portfolio Tracker
                </Typography>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{
                        borderColor: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: 'rgba(33, 150, 243, 0.1)',
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Chart */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                width: '100%',
                maxWidth: { xs: '100%', sm: '80%', md: '100%' },
                mx: 'auto'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <AnimatedChart />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ 
        py: { xs: 6, sm: 8, md: 10 }, 
        px: { xs: 2, sm: 3, md: 3 },
        background: 'rgba(0,0,0,0.02)' 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={People}
                value="50K+"
                label="Active Users"
                delay={0.2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={ShowChart}
                value="₹100M+"
                label="Assets Tracked"
                delay={0.4}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={Speed}
                value="0.1s"
                label="Update Time"
                delay={0.6}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={StarBorder}
                value="4.9"
                label="User Rating"
                delay={0.8}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Powerful Features
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} delay={0.2 * index} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, background: 'rgba(0,0,0,0.02)' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ 
              mb: { xs: 4, md: 6 }, 
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            What Our Users Say
          </Typography>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TestimonialCard {...testimonial} delay={0.2 * index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Ready to Start Tracking?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                px: { xs: 2, sm: 0 }
              }}
            >
              Join thousands of investors who trust Stocksphere for their portfolio management
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage; 