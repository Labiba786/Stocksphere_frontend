import React, { useState, useMemo, useEffect } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Favorite, ShowChart } from "@mui/icons-material";
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import { stockApi } from "./services/service";
import { motion, AnimatePresence } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalValue: 0,
    totalStocks: 0,
    bestPerformer: "N/A",
    worstPerformer: "N/A",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    setDarkMode(prefersDarkMode);
    fetchStocksAndMetrics();
  }, [prefersDarkMode]);

  const fetchStocksAndMetrics = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              background: darkMode
                ? "rgba(18, 18, 18, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ px: "18px" }}>
              <Toolbar disableGutters>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                      p: 1,
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                    }}
                  >
                    <ShowChart sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      ml: 2,
                      fontWeight: 700,
                      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Stocksphere
                  </Typography>
                </motion.div>

                <Box sx={{ flexGrow: 1 }} />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <IconButton
                    onClick={() => setDarkMode(!darkMode)}
                    sx={{
                      width: 40,
                      height: 40,
                      background: darkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                      borderRadius: "12px",
                      "&:hover": {
                        background: darkMode
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    {darkMode ? "☀️" : "🌙"}
                  </IconButton>
                </motion.div>
              </Toolbar>
            </Box>
          </AppBar>

          <Box
            sx={{
              mt: 4,
              mb: 4,
              flexGrow: 1,
              position: "relative",
              px: "18px",
            }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <Dashboard
                      totalValue={metrics.totalValue}
                      totalStocks={metrics.totalStocks}
                      bestPerformer={metrics.bestPerformer}
                      worstPerformer={metrics.worstPerformer}
                    />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <StockForm
                      onSubmit={editingStock ? handleEditStock : handleAddStock}
                      initialValues={editingStock}
                    />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <StockList
                      stocks={stocks}
                      onEdit={setEditingStock}
                      onDelete={handleDeleteStock}
                    />
                  </ErrorBoundary>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box
            component="footer"
            sx={{
              py: "5px",
              px: "18px",
              mt: "auto",
              background: darkMode
                ? "rgba(18, 18, 18, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                Proudly developed by{" "}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Labiba
                </Box>{" "}
                with
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Favorite
                    sx={{
                      fontSize: 16,
                      color: "#ff4081",
                    }}
                  />
                </motion.div>
              </Typography>
            </motion.div>
          </Box>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          TransitionComponent={motion.div}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              backdropFilter: "blur(8px)",
              background: darkMode
                ? "rgba(18, 18, 18, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
            }}
            elevation={6}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
