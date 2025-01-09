import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShowChart } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Logo = ({ showText = true, size = 'medium' }) => {
  const sizes = {
    small: { icon: 24, text: 'h6' },
    medium: { icon: 32, text: 'h5' },
    large: { icon: 48, text: 'h4' },
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <motion.div
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            p: size === 'small' ? 0.8 : 1,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
          }}
        >
          <ShowChart sx={{ fontSize: sizes[size].icon, color: 'white' }} />
        </Box>
      </motion.div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant={sizes[size].text}
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '0.5px',
            }}
          >
            Stocksphere
          </Typography>
        </motion.div>
      )}
    </Box>
  );
};

export default Logo; 