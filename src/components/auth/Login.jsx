import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Lock,
  Visibility,
  VisibilityOff,
  LoginOutlined,
  ArrowBack,
  Person,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axios';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (field) => (event) => {
    event.preventDefault();
    setFormData({ ...formData, [field]: event.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setIsLoading(true);
      setApiError('');

      if (!validateForm()) {
        return;
      }

      const response = await axios.post('https://stocksphere-backend-329r.onrender.com/api/user/login', {
          username: formData.username,
          password: formData.password
      });

      if (response.status === 200) {
        login(response.data);
        setSuccessMessage('Login successful! Redirecting...');

        const from = location.state?.from?.pathname || '/dashboard';
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 409) {
        setApiError('Invalid username or password. Please try again.');
      } else {
        setApiError(error.response?.data || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    // Handle forgot password logic
    console.log('Forgot password clicked');
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
          : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(-4px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Back to Home
          </Button>
        </motion.div>
      </Box>

      {/* Left Section */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 3,
                fontSize: { md: '2.5rem', lg: '3.5rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                lineHeight: 1.2,
              }}
            >
              Welcome to Stocksphere
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                fontWeight: 500,
                textShadow: '0 2px 8px rgba(0,0,0,0.1)',
                lineHeight: 1.6,
              }}
            >
              Your smart portfolio tracking journey continues here. Monitor your investments and make informed decisions with real-time data.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Right Section - Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '450px',
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(0, 0, 0, 0.2)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: 4,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 30px rgba(0, 0, 0, 0.3)'
                : '0 4px 30px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.7)'}`,
              p: { xs: 3, sm: 4 },
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
              >
                Please sign in to continue
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} noValidate>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange('username')}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Box sx={{ textAlign: 'right', mb: 3 }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleForgotPassword}
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginOutlined />}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    height: 56,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .4)',
                    },
                  }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleSignUp}
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </motion.div>
            </form>
          </Box>
        </motion.div>
      </Box>

      {/* Success Message Snackbar */}
      <Snackbar
        open={!!successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000
        }}
      >
        <Alert 
          severity="success" 
          elevation={6} 
          variant="filled"
          sx={{ 
            width: '100%', 
            minWidth: '300px',
            fontSize: '1rem',
            backgroundColor: '#4caf50',
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Message Snackbar */}
      <Snackbar
        open={!!apiError}
        autoHideDuration={6000}
        onClose={() => setApiError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000
        }}
      >
        <Alert 
          severity="error" 
          elevation={6} 
          variant="filled"
          onClose={() => setApiError('')}
          sx={{ 
            width: '100%', 
            minWidth: '300px',
            fontSize: '1rem',
            backgroundColor: '#f44336',
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          {apiError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;