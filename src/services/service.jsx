import axios from 'axios';
import Cookies from 'js-cookie';

const USD_TO_INR_RATE = 83.50;
const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
const API_BASE_URL = 'https://stocksphere-backend-329r.onrender.com/api/stocks';
let stockValue = 0;

// Helper function to get the token from cookies
function getAuthToken() {
  return Cookies.get('token'); // Replace 'authToken' with the actual cookie name for the token
}

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the Authorization header in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Update fetchPrice to return the price
const fetchPrice = async (ticker) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`
    );
    return Number(response.data.c); // `c` is the current price from Finnhub API
  } catch (error) {
    console.error(`Error fetching price for ${ticker}:`, error);
    return null; // Return null if there's an error
  }
};

export const stockApi = {
  getAllStocks: async () => {
    const response = await apiClient.get();
    return response.data;
  },

  addStock: async (stock) => {
    const response = await apiClient.post('', stock);
    return response.data;
  },

  updateStock: async (id, stock) => {
    const response = await apiClient.put(`/${id}`, stock);
    return response.data;
  },

  deleteStock: async (id) => {
    await apiClient.delete(`/${id}`);
    return true;
  },

  getPortfolioMetrics: async () => {
    try {
      const stocks = await stockApi.getAllStocks();
      if (!stocks || stocks.length === 0) {
        return {
          totalValue: 0,
          totalStocks: 0,
          bestPerformer: 'N/A',
          worstPerformer: 'N/A',
        };
      }

      const metrics = await stocks.reduce(async (accPromise, stock) => {
        const acc = await accPromise; // Await the accumulator from the previous iteration
        const stockPrice = await fetchPrice(stock.ticker); // Await stock price for the current stock

        if (stockPrice !== null) {
          // Calculate current stock value (current price * quantity)
          stockValue = Number(stock.quantity) * (stockPrice * USD_TO_INR_RATE);
          acc.totalValue += stockValue;

          // Calculate buy value (buy price * quantity)
          const buyValue = Number(stock.buyPrice) * Number(stock.quantity);

          // Calculate performance percent based on buy price and current value
          const performancePercent = buyValue
            ? ((stockValue - buyValue) / buyValue) * 100
            : 0;

          // Best performer logic
          if (!acc.bestPerformer || performancePercent > acc.bestPerformerValue) {
            acc.bestPerformer = `${stock.ticker} (${performancePercent.toFixed(2)}%)`;
            acc.bestPerformerValue = performancePercent;
          }

          // Worst performer logic
          if (!acc.worstPerformer || performancePercent < acc.worstPerformerValue) {
            acc.worstPerformer = `${stock.ticker} (${performancePercent.toFixed(2)}%)`;
            acc.worstPerformerValue = performancePercent;
          }
        }

        return acc;
      }, Promise.resolve({
        totalValue: 0,
        totalStocks: stocks.length,
        bestPerformer: null,
        worstPerformer: null,
        bestPerformerValue: null,
        worstPerformerValue: null,
      }));

      delete metrics.bestPerformerValue;
      delete metrics.worstPerformerValue;

      return metrics;
    } catch (error) {
      console.error('Error calculating portfolio metrics:', error);
      throw error;
    }
  },

  // Optional: If there's an API endpoint for metrics
  getMetricsFromAPI: async () => {
    const response = await apiClient.get('/metrics');
    return response.data;
  },
};
