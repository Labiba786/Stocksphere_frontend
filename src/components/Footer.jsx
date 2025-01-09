import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { FavoriteOutlined } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Proudly developed by{' '}
        <Link
          href="https://github.com/Labiba786"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 700,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Labiba
        </Link>{' '}
        with{' '}
        <FavoriteOutlined 
          sx={{ 
            fontSize: 12, 
            color: 'error.main',
            verticalAlign: 'middle',
            ml: 0.5,
            animation: 'pulse 1.5s ease infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' },
            },
          }} 
        />
      </Typography>
    </Box>
  );
};

export default Footer; 