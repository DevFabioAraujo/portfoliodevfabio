import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Star, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCrypto, useFavorites } from '../../hooks/useCrypto';
import { formatters } from '../../services/cryptoAPI';
import CryptoChart from './CryptoChart';

const CryptoDashboard = () => {
  const {
    coins,
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
  } = useCrypto();

  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Filtrar apenas favoritos se necessário
  const displayCoins = showOnlyFavorites 
    ? coins.filter(coin => isFavorite(coin.id))
    : coins;

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
  };

  const handleRefresh = () => {
    refresh();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌ Erro ao carregar dados</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar ao Portfólio</span>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Dashboard de Criptomoedas
                </h1>
                <p className="text-gray-600 mt-1">
                  Acompanhe os preços e tendências do mercado crypto em tempo real
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
              
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="usd">USD</option>
                <option value="brl">BRL</option>
                <option value="eur">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel de Controles e Lista */}
          <div className="lg:col-span-2 space-y-6">
            {/* Controles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Busca */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar criptomoeda..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="market_cap_desc">Market Cap ↓</option>
                  <option value="name_asc">Nome ↑</option>
                  <option value="name_desc">Nome ↓</option>
                  <option value="price_asc">Preço ↑</option>
                  <option value="price_desc">Preço ↓</option>
                  <option value="change_asc">Variação ↑</option>
                  <option value="change_desc">Variação ↓</option>
                </select>

                {/* Filtro Favoritos */}
                <button
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    showOnlyFavorites
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Star className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                  Favoritos
                </button>
              </div>
            </div>

            {/* Lista de Criptomoedas */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {loading && coins.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando dados...</p>
                </div>
              ) : (
                <>
                  {/* Header da Tabela */}
                  <div className="hidden sm:grid sm:grid-cols-6 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
                    <div className="col-span-2">Moeda</div>
                    <div className="text-right">Preço</div>
                    <div className="text-right">24h</div>
                    <div className="text-right">Market Cap</div>
                    <div className="text-center">Ações</div>
                  </div>

                  {/* Lista */}
                  <div className="divide-y divide-gray-200">
                    {displayCoins.map((coin) => (
                      <CoinRow
                        key={coin.id}
                        coin={coin}
                        currency={currency}
                        isFavorite={isFavorite(coin.id)}
                        onToggleFavorite={() => toggleFavorite(coin.id)}
                        onSelect={() => handleCoinSelect(coin)}
                        isSelected={selectedCoin?.id === coin.id}
                      />
                    ))}
                  </div>

                  {/* Carregar Mais */}
                  {hasMore && !showOnlyFavorites && (
                    <div className="p-4 text-center border-t">
                      <button
                        onClick={loadMore}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Carregando...' : 'Carregar Mais'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Painel do Gráfico */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {selectedCoin ? (
                <CryptoChart coin={selectedCoin} />
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Selecione uma criptomoeda para ver o gráfico
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para cada linha da moeda
const CoinRow = ({ coin, currency, isFavorite, onToggleFavorite, onSelect, isSelected }) => {
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      {/* Layout Mobile */}
      <div className="sm:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium text-gray-900">{coin.name}</div>
              <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="p-1"
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            {formatters.formatPrice(coin.current_price, currency)}
          </div>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">
              {formatters.formatPercentage(Math.abs(priceChange))}
            </span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Market Cap: {formatters.formatMarketCap(coin.market_cap)}
        </div>
      </div>

      {/* Layout Desktop */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-4 items-center">
        <div className="col-span-2 flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900">{coin.name}</div>
            <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
          </div>
        </div>
        
        <div className="text-right font-semibold">
          {formatters.formatPrice(coin.current_price, currency)}
        </div>
        
        <div className={`text-right flex items-center justify-end gap-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-medium">
            {formatters.formatPercentage(Math.abs(priceChange))}
          </span>
        </div>
        
        <div className="text-right text-sm text-gray-600">
          {formatters.formatMarketCap(coin.market_cap)}
        </div>
        
        <div className="text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;
