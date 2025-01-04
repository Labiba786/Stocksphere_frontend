const API_BASE_URL = 'https://stocksphere-backend-329r.onrender.com/api/stocks';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }
  return response.json();
}

export const stockApi = {
  getAllStocks: async () => {
    const response = await fetch(API_BASE_URL);
    return handleResponse(response);
  },

  addStock: async (stock) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    });
    return handleResponse(response);
  },

  updateStock: async (id, stock) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stock),
    });
    return handleResponse(response);
  },

  deleteStock: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
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
          worstPerformer: 'N/A'
        };
      }

      const metrics = stocks.reduce((acc, stock) => {
        // Calculate total value
        const stockValue = stock.quantity * stock.buyPrice;
      acc.totalValue += stockValue;

      // Calculate performance percentage
        const performancePercent = stock.currentPrice 
          ? ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100
          : 0;
      
      // Update best and worst performers
      if (!acc.bestPerformer || performancePercent > acc.bestPerformerValue) {
        acc.bestPerformer = `${stock.ticker} (${performancePercent.toFixed(2)}%)`;
        acc.bestPerformerValue = performancePercent;
      }
      if (!acc.worstPerformer || performancePercent < acc.worstPerformerValue) {
        acc.worstPerformer = `${stock.ticker} (${performancePercent.toFixed(2)}%)`;
        acc.worstPerformerValue = performancePercent;
      }

      return acc;
    }, {
      totalValue: 0,
        totalStocks: stocks.length,
      bestPerformer: null,
      worstPerformer: null,
      bestPerformerValue: null,
      worstPerformerValue: null,
    });

      // Remove temporary calculation values
    delete metrics.bestPerformerValue;
    delete metrics.worstPerformerValue;

      return metrics;
    } catch (error) {
      console.error('Error calculating portfolio metrics:', error);
      throw error;
    }
  },

  // Optional: If you have an endpoint for metrics
  getMetricsFromAPI: async () => {
    const response = await fetch(`${API_BASE_URL}/metrics`);
    return handleResponse(response);
  }
};

