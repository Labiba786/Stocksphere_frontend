import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  IconButton,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Logo from './Logo';

const Navigation = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 1 : 0}
      sx={{
        background: isScrolled
          ? theme.palette.mode === 'dark'
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Box sx={{ px: '18px' }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: isScrolled ? 1 : 1.5,
            transition: 'all 0.3s ease',
          }}
        >
          <Logo size={isScrolled ? 'small' : 'medium'} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ 
                ml: 1,
                color: isScrolled ? 'text.primary' : 'inherit',
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                },
              }}
            >
              Login
            </Button>
            
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navigation; 