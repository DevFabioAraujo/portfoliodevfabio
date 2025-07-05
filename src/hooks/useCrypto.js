import { useState, useEffect, useCallback } from 'react';
import { cryptoAPI } from '../services/cryptoAPI';

export const useCrypto = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Carregar dados do mercado
  const loadMarketData = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await cryptoAPI.getMarketData(pageNum, 50, currency);
      
      if (append) {
        setCoins(prev => [...prev, ...data]);
      } else {
        setCoins(data);
      }

      setHasMore(data.length === 50);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  // Carregar mais dados (paginação)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMarketData(nextPage, true);
    }
  }, [loading, hasMore, page, loadMarketData]);

  // Filtrar moedas baseado no termo de busca
  const filteredCoins = coins.filter(coin => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      coin.name.toLowerCase().includes(term) ||
      coin.symbol.toLowerCase().includes(term)
    );
  });

  // Ordenar moedas
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'change_asc':
        return (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0);
      case 'change_desc':
        return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
      case 'market_cap_desc':
      default:
        return (b.market_cap || 0) - (a.market_cap || 0);
    }
  });

  // Recarregar dados
  const refresh = useCallback(() => {
    setPage(1);
    loadMarketData(1, false);
  }, [loadMarketData]);

  // Efeito para carregar dados iniciais
  useEffect(() => {
    loadMarketData(1, false);
  }, [loadMarketData]);

  return {
    coins: sortedCoins,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    currency,
    setCurrency,
    hasMore,
    loadMore,
    refresh,
  };
};

export const useCoinHistory = (coinId, days = 7) => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    if (!coinId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await cryptoAPI.getCoinHistory(coinId, days);
      setHistoryData(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar histórico:', err);
    } finally {
      setLoading(false);
    }
  }, [coinId, days]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    historyData,
    loading,
    error,
    refresh: loadHistory,
  };
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('crypto-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (err) {
        console.error('Erro ao carregar favoritos:', err);
      }
    }
  }, []);

  // Salvar favoritos no localStorage
  const saveFavorites = useCallback((newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('crypto-favorites', JSON.stringify(newFavorites));
  }, []);

  // Adicionar aos favoritos
  const addToFavorites = useCallback((coinId) => {
    saveFavorites(prev => {
      if (!prev.includes(coinId)) {
        return [...prev, coinId];
      }
      return prev;
    });
  }, [saveFavorites]);

  // Remover dos favoritos
  const removeFromFavorites = useCallback((coinId) => {
    saveFavorites(prev => prev.filter(id => id !== coinId));
  }, [saveFavorites]);

  // Verificar se está nos favoritos
  const isFavorite = useCallback((coinId) => {
    return favorites.includes(coinId);
  }, [favorites]);

  // Toggle favorito
  const toggleFavorite = useCallback((coinId) => {
    if (isFavorite(coinId)) {
      removeFromFavorites(coinId);
    } else {
      addToFavorites(coinId);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
};
