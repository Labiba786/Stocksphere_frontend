import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Zoom,
  TablePagination,
  Chip,
  useTheme,
  Card,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp,
  TrendingDown,
  Warning,
} from '@mui/icons-material';

const StockList = ({ stocks = [], onEdit, onDelete }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isDarkMode = theme.palette.mode === 'dark';

  // Reset page when stocks change
  React.useEffect(() => {
    setPage(0);
  }, [stocks.length]);

  if (!stocks || stocks.length === 0) {
    return (
      <Card
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          background: isDarkMode ? 'rgba(41, 41, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <Warning sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Stocks Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start building your portfolio by adding some stocks!
        </Typography>
      </Card>
    );
  }

  const formatCurrency = (value) => {
    return `₹${(Number(value) || 0).toFixed(2)}`;
  };

  const calculateProfitPercentage = (initialValue, currentValue) => {
    if (!initialValue || initialValue === 0) return 0;
    return ((currentValue - initialValue) / initialValue) * 100;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        background: isDarkMode ? 'rgba(41, 41, 41, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }
      }}
    >
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
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
            Stock Holdings
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
            }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>Stock Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>Ticker</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} align="right">Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} align="right">Buy Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} align="right">Current Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} align="right">Total Value</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} align="right">Profit/Loss</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {stocks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((stock) => {
                const currentPrice = stock.currentPrice || stock.buyPrice || 0;
                const buyPrice = stock.buyPrice || 0;
                const quantity = stock.quantity || 0;
                
                const currentValue = quantity * currentPrice;
                const initialValue = quantity * buyPrice;
                const profit = currentValue - initialValue;
                const profitPercentage = calculateProfitPercentage(initialValue, currentValue);

                return (
                <TableRow 
                    key={stock.id}
                  sx={{ 
                      transition: 'background-color 0.3s',
                    '&:hover': { 
                        backgroundColor: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                  <TableCell>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: theme.palette.text.primary 
                      }}>
                        {stock.name || 'N/A'}
                      </Typography>
                  </TableCell>
                  <TableCell>
                      <Chip
                        label={stock.ticker || 'N/A'}
                        size="small"
                        sx={{
                          fontWeight: 'bold',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                      {quantity}
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                        {formatCurrency(buyPrice)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                        {formatCurrency(currentPrice)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500,
                        color: theme.palette.text.primary 
                      }}>
                        {formatCurrency(currentValue)}
                      </Typography>
                  </TableCell>
                    <TableCell align="right">
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 1,
                      }}>
                        {profitPercentage >= 0 ? (
                          <TrendingUp sx={{ color: theme.palette.success.main }} />
                        ) : (
                          <TrendingDown sx={{ color: theme.palette.error.main }} />
                        )}
                        <Typography variant="body2" sx={{
                          color: profitPercentage >= 0
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          fontWeight: 'bold',
                        }}>
                          {formatCurrency(profit)} ({profitPercentage.toFixed(2)}%)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Edit Stock" TransitionComponent={Zoom}>
                          <IconButton
                            onClick={() => onEdit(stock)}
                            size="small"
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': {
                                transform: 'scale(1.1)',
                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Stock" TransitionComponent={Zoom}>
                          <IconButton
                            onClick={() => onDelete(stock.id)}
                                  size="small" 
                            sx={{
                              color: theme.palette.error.main,
                              '&:hover': {
                                transform: 'scale(1.1)',
                                backgroundColor: 'rgba(211, 47, 47, 0.04)',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                  </TableCell>
                </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={stocks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: 1,
            borderColor: 'divider',
          color: theme.palette.text.primary,
          }}
      />
    </Paper>
  );
};

// Add PropTypes
StockList.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ticker: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      buyPrice: PropTypes.number.isRequired,
      currentPrice: PropTypes.number,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Add default props
StockList.defaultProps = {
  stocks: [],
};

export default StockList;

