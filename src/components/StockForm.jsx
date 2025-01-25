import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Slide, 
  IconButton, 
  Collapse,
  Fade,
  Tooltip,
  InputAdornment,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Business
} from '@mui/icons-material';

const StockForm = ({ onSubmit, initialValues }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [stock, setStock] = useState(
    initialValues || { name: '', ticker: '', quantity: '', buyPrice: '' }
  );
  const [isExpanded, setIsExpanded] = useState(!!initialValues);
  const [isLoaded, setIsLoaded] = useState(false);

  const tickerOptions = [
    "AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "FB", "NFLX", "NVDA", "BABA", "JPM", "INTC", "AMD", "IBM", "ORCL", "CSCO", "SAP", "V", "MA", "PYPL", "CRM", "ADBE", "PFE", "MRK", "UNH", "JNJ", "KO", "PEP", "DIS", "MCD", "NKE"
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (initialValues) {
      setStock(initialValues);
      setIsExpanded(true);
    } else {
      setStock({ name: '', ticker: '', quantity: '1', buyPrice: '' });
      setIsExpanded(false);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock((prevStock) => ({
      ...prevStock,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittingStock = {
      ...stock,
      quantity: Number(stock.quantity),
      buyPrice: Number(stock.buyPrice)
    };
    onSubmit(submittingStock);
    if (!initialValues) {
      setStock({ name: '', ticker: '', quantity: '', buyPrice: '' });
      setIsExpanded(false);
    }
  };

  return (
    <Slide direction="up" in={isLoaded} mountOnEnter unmountOnExit>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: isDarkMode ? 'rgba(41, 41, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isDarkMode 
              ? '0 8px 24px rgba(255,255,255,0.1)'
              : '0 8px 24px rgba(0,0,0,0.12)',
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {initialValues ? 'Edit Stock' : 'Add New Stock'}
          </Typography>
          <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
            <IconButton 
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ 
                transition: 'transform 0.3s ease',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                color: theme.palette.text.primary,
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Collapse in={isExpanded}>
          <Fade in={isExpanded}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  name="name"
                  label="Stock Name"
                  value={stock.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiInputBase-input': {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
                <FormControl fullWidth>
                  {/* <InputLabel id="ticker-label" sx={{ color: theme.palette.text.secondary }}>
                    Ticker Symbol
                  </InputLabel> */}
                  <Select
                    labelId="ticker-label"
                    name="ticker"
                    value={stock.ticker}
                    onChange={handleChange}
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Business sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    }
                    displayEmpty
                    inputProps={{ placeholder: 'Select a ticker symbol' }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                      },
                      '& .MuiInputBase-input': {
                        color: theme.palette.text.primary,
                      },
                    }}
                  >
                    {tickerOptions.map((ticker) => (
                      <MenuItem key={ticker} value={ticker}>
                        {ticker}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={stock.quantity}
                    onChange={handleChange}
                    required
                    InputProps={{
                      inputProps: { min: "1" },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                      },
                      '& .MuiInputBase-input': {
                        color: theme.palette.text.primary,
                      },
                    }}
                  />

                  <TextField
                    name="buyPrice"
                    label="Buy Price (₹)"
                    type="number"
                    value={stock.buyPrice}
                    onChange={handleChange}
                    required
                    InputProps={{
                      inputProps: { min: "0", step: "0.01" }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                      },
                      '& .MuiInputBase-input': {
                        color: theme.palette.text.primary,
                      },
                    }}
                  />
                </Box>
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={initialValues ? <EditIcon /> : <AddIcon />}
                  sx={{ 
                    mt: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 10px rgba(33, 203, 243, .4)',
                    }
                  }}
                >
                  {initialValues ? 'Update Stock' : 'Add Stock'}
                </Button>
              </Box>
            </form>
          </Fade>
        </Collapse>
      </Paper>
    </Slide>
  );
};

export default StockForm;
