import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Instância do axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Cache simples para evitar muitas requisições
const cache = new Map();
const CACHE_DURATION = 60000; // 1 minuto

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const cryptoAPI = {
  // Buscar lista de criptomoedas com dados de mercado
  async getMarketData(page = 1, perPage = 50, currency = 'usd') {
    const cacheKey = `market-${page}-${perPage}-${currency}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: true,
          price_change_percentage: '1h,24h,7d',
        },
      });

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do mercado:', error);
      throw new Error('Falha ao carregar dados das criptomoedas');
    }
  },

  // Buscar dados históricos de uma criptomoeda específica
  async getCoinHistory(coinId, days = 7, currency = 'usd') {
    const cacheKey = `history-${coinId}-${days}-${currency}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await api.get(`/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: currency,
          days: days,
          interval: days <= 1 ? 'hourly' : 'daily',
        },
      });

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      throw new Error('Falha ao carregar histórico da criptomoeda');
    }
  },

  // Buscar informações detalhadas de uma criptomoeda
  async getCoinDetails(coinId) {
    const cacheKey = `details-${coinId}`;
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await api.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
        },
      });

      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes:', error);
      throw new Error('Falha ao carregar detalhes da criptomoeda');
    }
  },

  // Buscar lista de criptomoedas para autocomplete
  async searchCoins(query) {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await api.get('/search', {
        params: {
          query: query,
        },
      });

      return response.data.coins.slice(0, 10); // Limitar a 10 resultados
    } catch (error) {
      console.error('Erro na busca:', error);
      return [];
    }
  },

  // Buscar trending coins
  async getTrendingCoins() {
    const cacheKey = 'trending';
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await api.get('/search/trending');
      setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar trending:', error);
      throw new Error('Falha ao carregar criptomoedas em alta');
    }
  },
};

// Utilitários para formatação
export const formatters = {
  // Formatar preço
  formatPrice: (price, currency = 'USD') => {
    if (price === null || price === undefined) return 'N/A';
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'usd' ? 'USD' : currency.toUpperCase(),
      minimumFractionDigits: price < 1 ? 6 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  },

  // Formatar porcentagem
  formatPercentage: (percentage) => {
    if (percentage === null || percentage === undefined) return 'N/A';
    
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(percentage / 100);

    return formatted;
  },

  // Formatar market cap
  formatMarketCap: (marketCap) => {
    if (marketCap === null || marketCap === undefined) return 'N/A';
    
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  },

  // Formatar volume
  formatVolume: (volume) => {
    return formatters.formatMarketCap(volume);
  },
};
