import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://stocksphere-backend-329r.onrender.com/api/stocks';

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

      const metrics = stocks.reduce(
        (acc, stock) => {
          const stockValue = stock.quantity * stock.buyPrice;
          acc.totalValue += stockValue;

          const performancePercent = stock.currentPrice
            ? ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100
            : 0;

          if (!acc.bestPerformer || performancePercent > acc.bestPerformerValue) {
            acc.bestPerformer = `${stock.ticker} (${performancePercent.toFixed(2)}%)`;
            acc.bestPerformerValue = performancePercent;
          }
          if (!acc.worstPerformer || performancePercent < acc.worstPerformerValue) {
            acc.worstPerformer = `${stock.ticker} (${performancePercent.toFixed(2)}%)`;
            acc.worstPerformerValue = performancePercent;
          }

          return acc;
        },
        {
          totalValue: 0,
          totalStocks: stocks.length,
          bestPerformer: null,
          worstPerformer: null,
          bestPerformerValue: null,
          worstPerformerValue: null,
        }
      );

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
