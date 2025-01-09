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
        height: 400,
        width: '100%',
        background: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 4,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        p: 3,
      }}
    >
      <Line data={data} options={options} />
    </Box>
  );
};

const TestimonialCard = ({ name, role, comment, rating, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Box
      sx={{
        p: 4,
        height: '100%',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        backdropFilter: 'blur(20px)',
      }}
    >
      <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
        "{comment}"
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
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
        p: 3,
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
        <Icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
        p: 3,
        textAlign: 'center',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Icon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="body1" color="text.secondary">
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
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
            : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
          pt: '64px',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid 
            container 
            spacing={4} 
            alignItems="center"
            sx={{ position: 'relative' }}
          >
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                position: 'relative',
                zIndex: 3
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
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    position: 'relative',
                  }}
                >
                  Stocksphere
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ mb: 4, color: theme.palette.text.primary }}
                >
                  Your Smart Portfolio Tracker
                </Typography>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      mr: 2,
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
                </motion.div>
              </motion.div>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                position: 'relative',
                zIndex: 2
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

        {/* Background animation elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ['0vh', '100vh'],
                x: Math.random() * 100 + 'vw',
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                width: '2px',
                height: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, background: 'rgba(0,0,0,0.02)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Powerful Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.2 * index}
            />
          </Grid>
          ))}
          </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, background: 'rgba(0,0,0,0.02)' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard {...testimonial} delay={0.2 * index} />
          </Grid>
            ))}
        </Grid>
      </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
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
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to Start Tracking?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of investors who trust Stocksphere for their portfolio management
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
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