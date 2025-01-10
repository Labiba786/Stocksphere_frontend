import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  useMediaQuery,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Brightness4, 
  Brightness7,
  Menu as MenuIcon 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navigation = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
        elevation={0}
      sx={{
        background: isScrolled
          ? theme.palette.mode === 'dark'
              ? 'rgba(18, 18, 18, 0.85)'
              : 'rgba(255, 255, 255, 0.85)'
            : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled 
            ? `1px solid ${theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.05)'}`
            : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: isScrolled
              ? 'linear-gradient(90deg, rgba(33, 150, 243, 0.05), rgba(33, 203, 243, 0.05))'
          : 'transparent',
            opacity: 0.5,
            transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          }
      }}
    >
      <Box sx={{ px: { xs: 1, sm: 2, md: '18px' } }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: isScrolled ? 1 : 1.5,
            transition: 'all 0.3s ease',
            minHeight: { xs: '56px', sm: '64px' },
          }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
        >
          <Logo 
            size={isScrolled ? 'small' : 'medium'} 
            showText={!isMobile} 
          />
            </motion.div>
          
          {isMobile ? (
            // Mobile Menu
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <motion.div whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                  size="small"
                sx={{
                    width: 40,
                    height: 40,
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(0, 0, 0, 0.08)',
                      }
                    }}
                  >
                  {darkMode ? <Brightness7 sx={{ fontSize: 20 }} /> : <Brightness4 sx={{ fontSize: 20 }} />}
              </IconButton>
                </motion.div>
              
                <motion.div whileTap={{ scale: 0.95 }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(0, 0, 0, 0.08)',
                      }
                }}
              >
                <MenuIcon />
              </IconButton>
                </motion.div>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                  TransitionComponent={Fade}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    background: theme.palette.mode === 'dark' 
                        ? 'rgba(18, 18, 18, 0.95)' 
                        : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                      border: `1px solid ${theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.05)'}`,
                      borderRadius: 2,
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  {['Login', 'Get Started'].map((item, index) => (
                    <MenuItem
                      key={item}
                      onClick={() => handleNavigation(item === 'Login' ? '/login' : '/register')}
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      {item}
                </MenuItem>
                  ))}
              </Menu>
            </Box>
          ) : (
            // Desktop Navigation
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                    size="small"
                sx={{
                      width: 40,
                      height: 40,
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s ease',
                  '&:hover': {
                          transform: 'translateY(-2px)',
                    bgcolor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.15)' 
                            : 'rgba(0, 0, 0, 0.08)',
                        }
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={darkMode ? 'dark' : 'light'}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.2 }}
              >
                        {darkMode ? (
                          <Brightness7 sx={{ fontSize: 20 }} />
                        ) : (
                          <Brightness4 sx={{ fontSize: 20 }} />
                        )}
                        </motion.div>
                      </AnimatePresence>
              </IconButton>
                  </motion.div>
              
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{ 
                  ml: 1,
                  color: isScrolled ? 'text.primary' : 'inherit',
                        transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(33, 150, 243, 0.1)',
                          transform: 'translateY(-2px)',
                  },
                }}
              >
                Login
              </Button>
                  </motion.div>
              
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  color: 'white',
                        transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .4)',
                  },
                }}
              >
                Get Started
              </Button>
                  </motion.div>
            </Box>
              </motion.div>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navigation; 