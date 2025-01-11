import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  useTheme,
  LinearProgress,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Person,
  Email,
  Visibility,
  VisibilityOff,
  Lock,
  ArrowForward,
  ArrowBack
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const steps = ['Personal Info', 'Security'];

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 0.25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 0.25;
    if (password.match(/[0-9]/)) strength += 0.25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 0.25;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength === 0) return '';
    if (strength <= 0.25) return 'Weak';
    if (strength <= 0.5) return 'Medium';
    if (strength <= 0.75) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 0.25) return theme.palette.error.main;
    if (strength <= 0.5) return theme.palette.warning.main;
    if (strength <= 0.75) return theme.palette.info.main;
    return theme.palette.success.main;
  };

  const handleChange = (field) => (event) => {
    const value = field === 'agreeToTerms' ? event.target.checked : event.target.value;
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    switch (field) {
      case 'fullName':
        newErrors.fullName = !value ? 'Name is required' : '';
        break;
      case 'email':
        newErrors.email = !value ? 'Email is required' : 
          !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
        break;
      case 'username':
        newErrors.username = !value ? 'Username is required' : 
          value.length < 3 ? 'Username must be at least 3 characters' : '';
        break;
      case 'password':
        newErrors.password = !value ? 'Password is required' : 
          value.length < 8 ? 'Password must be at least 8 characters' : '';
        if (formData.confirmPassword) {
          newErrors.confirmPassword = value !== formData.confirmPassword ? 
            'Passwords do not match' : '';
        }
        break;
      case 'confirmPassword':
        newErrors.confirmPassword = !value ? 'Please confirm password' : 
          value !== formData.password ? 'Passwords do not match' : '';
        break;
      case 'agreeToTerms':
        newErrors.agreeToTerms = !value ? 'You must agree to the terms' : '';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      validateField('fullName', formData.fullName);
      validateField('email', formData.email);
      if (!formData.fullName || !formData.email || errors.fullName || errors.email) {
        setApiError('Please fill all required fields correctly');
        return;
      }
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === steps.length - 1) {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.agreeToTerms) {
      setApiError('Please fill all required fields');
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');

      await axios.post(
        'https://stocksphere-backend-329r.onrender.com/api/user/add',
        {
          fullName: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }
      );

      // First show the success message
      setSuccessMessage('Registration successful! Redirecting to login...');
      
      // Clear form
      setFormData({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });

      // Wait for 3 seconds to ensure message is visible
      setTimeout(() => {
        // Then navigate
        navigate('/login', {
          state: { message: 'Registration successful! Please login with your credentials.' },
          replace: true
        });
      }, 3000);

    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.status === 409) {
        setApiError('User already exists. Please try a different email or username.');
      } else {
        setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
          : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
        p: { xs: 2, sm: 4 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            background: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Left side - Illustration */}
          <Box
            sx={{
              flex: '1 1 50%',
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
            }}
            >
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
                Welcome to Stocksphere
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Start your journey to smarter portfolio management
              </Typography>
          </Box>

          {/* Right side - Form */}
          <Box
            sx={{
              flex: '1 1 50%',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
              Get Started
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Create your account to start tracking your portfolio
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ flex: 1 }}>
              {activeStep === 0 ? (
                // Step 1: Personal Info
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
              ) : (
                // Step 2: Security
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                >
                  <TextField
                    fullWidth
                    label="Username"
                    value={formData.username}
                    onChange={handleChange('username')}
                    error={!!errors.username}
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
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange('password')}
                    error={!!errors.password}
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
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                  {formData.password && (
                    <Box sx={{ mb: 3 }}>
                      <LinearProgress
                        variant="determinate"
                        value={passwordStrength * 100}
                        sx={{
                          mb: 1,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getPasswordStrengthColor(passwordStrength),
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: getPasswordStrengthColor(passwordStrength) }}
                      >
                        Password Strength: {getPasswordStrengthText(passwordStrength)}
                      </Typography>
                    </Box>
                  )}
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={handleChange('agreeToTerms')}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{' '}
                        <Link href="#" underline="hover">Terms & Conditions</Link>
                        {' '}and{' '}
                        <Link href="#" underline="hover">Privacy Policy</Link>
                      </Typography>
                    }
                  />
                  {errors.agreeToTerms && (
                    <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                      {errors.agreeToTerms}
                    </Typography>
                  )}
                  {apiError && (
                    <Typography 
                      color="error" 
                      variant="body2" 
                      sx={{ mt: 2, textAlign: 'center' }}
                    >
                      {apiError}
                    </Typography>
                  )}
              </motion.div>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={activeStep === steps.length - 1 ? null : <ArrowForward />}
                disabled={isLoading}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .4)',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  activeStep === steps.length - 1 ? 'Sign Up' : 'Next'
                )}
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </motion.div>

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
            backgroundColor: '#4caf50', // Bright green
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
            backgroundColor: '#f44336', // Bright red
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

export default Register; 