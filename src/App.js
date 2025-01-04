import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
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
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <ShowChart
                sx={{
                  mr: 2,
                  fontSize: "2rem",
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  borderRadius: "50%",
                  p: 0.5,
                  boxShadow: "0 2px 10px rgba(33, 150, 243, 0.3)",
                }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "0.5px",
                }}
              >
                Stocksphere
              </Typography>
              <IconButton
                sx={{
                  ml: 1,
                  bgcolor: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    bgcolor: darkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => setDarkMode(!darkMode)}
                color="inherit"
              >
                {darkMode ? "☀️" : "🌙"}
              </IconButton>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50vh"
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
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
              </>
            )}
          </Container>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: "5px",
              px: 2,
              mt: "auto",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.87)"
                  : "rgba(25, 118, 210, 0.08)",
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              Proudly developed by <b>Labiba</b> with
              <Favorite
                sx={{
                  fontSize: 16,
                  color: "#ff4081",
                  animation: "pulse 1.5s ease infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.2)" },
                    "100%": { transform: "scale(1)" },
                  },
                }}
              />
            </Typography>
          </Box>
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
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
