import React from 'react';
import { Box } from '@mui/material';
import Dashboard from '../components/Dashboard';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { stockApi } from '../services/service';
import { Snackbar, Alert } from '@mui/material';

const DashboardPage = ({ darkMode, setDarkMode }) => {

  const [stocks, setStocks] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    fetchStocksAndMetrics();
  }, []);

  const fetchStocksAndMetrics = async () => {
    try {
      const [fetchedStocks, fetchedMetrics] = await Promise.all([
        stockApi.getAllStocks(),
        stockApi.getPortfolioMetrics(),
      ]);
      setStocks(fetchedStocks);
      setMetrics(fetchedMetrics);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbar({
        open: true,
        message: `Failed to fetch data: ${error.message || "Unknown error"}`,
        severity: "error",
      });
    } finally {
    }
  };

  const handleAddStock = async (newStock) => {
    try {
      const addedStock = await stockApi.addStock(newStock);
      setStocks([...stocks, addedStock]);
      await fetchStocksAndMetrics();
      setSnackbar({
        open: true,
        message: "Stock added successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding stock:", error);
      setSnackbar({
        open: true,
        message: `Failed to add stock: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        severity: "error",
      });
    }
  };

  const handleEditStock = async (updatedStock) => {
    try {
      const editedStock = await stockApi.updateStock(
        updatedStock.id,
        updatedStock
      );
      setStocks(
        stocks.map((stock) =>
          stock.id === editedStock.id ? editedStock : stock
        )
      );
      setEditingStock(null);
      await fetchStocksAndMetrics();
      setSnackbar({
        open: true,
        message: "Stock updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      setSnackbar({
        open: true,
        message: `Failed to update stock: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        severity: "error",
      });
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await stockApi.deleteStock(id);
      setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
      await fetchStocksAndMetrics();
      setSnackbar({
        open: true,
        message: "Stock deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting stock:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete stock. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, p: 3 }}>
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <Dashboard totalValue={metrics.totalValue} totalStocks={stocks.length} bestPerformer={metrics.bestPerformer} worstPerformer={metrics.worstPerformer} />
        <StockForm onSubmit={editingStock ? handleEditStock : handleAddStock} initialValues={editingStock}/>
        <StockList stocks={stocks} onEdit={handleEditStock} onDelete={handleDeleteStock} />
      </Box>
      <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      <Footer />
    </Box>
  );
};

export default DashboardPage; 