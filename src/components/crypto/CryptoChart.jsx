import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { useCoinHistory } from '../../hooks/useCrypto';
import { formatters } from '../../services/cryptoAPI';

const CryptoChart = ({ coin }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const { historyData, loading, error } = useCoinHistory(coin.id, selectedPeriod);

  const periods = [
    { value: 1, label: '1D' },
    { value: 7, label: '7D' },
    { value: 30, label: '30D' },
    { value: 90, label: '90D' },
  ];

  // Processar dados para o gráfico
  const chartData = historyData?.prices?.map((price) => {
    const timestamp = price[0];
    const value = price[1];
    
    return {
      timestamp,
      price: value,
      date: new Date(timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        ...(selectedPeriod > 7 && { year: '2-digit' }),
      }),
      time: new Date(timestamp).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }) || [];

  // Calcular estatísticas do período
  const stats = React.useMemo(() => {
    if (!chartData.length) return null;

    const prices = chartData.map(d => d.price);
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const change = lastPrice - firstPrice;
    const changePercent = (change / firstPrice) * 100;

    return {
      firstPrice,
      lastPrice,
      minPrice,
      maxPrice,
      change,
      changePercent,
      isPositive: change >= 0,
    };
  }, [chartData]);

  // Tooltip customizado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">
            {selectedPeriod === 1 ? data.time : data.date}
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {formatters.formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{coin.name}</h3>
            <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{coin.name}</h3>
            <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-red-500 text-sm">
            Erro ao carregar gráfico
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header da Moeda */}
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{coin.name}</h3>
          <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
        </div>
      </div>

      {/* Preço Atual */}
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">
          {formatters.formatPrice(coin.current_price)}
        </div>
        
        <div className={`flex items-center gap-1 text-sm ${
          (coin.price_change_percentage_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {(coin.price_change_percentage_24h || 0) >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">
            {formatters.formatPercentage(Math.abs(coin.price_change_percentage_24h || 0))}
          </span>
          <span className="text-gray-500">24h</span>
        </div>
      </div>

      {/* Seletor de Período */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setSelectedPeriod(period.value)}
            className={`flex-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              selectedPeriod === period.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Estatísticas do Período */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="text-gray-500">Mínimo</div>
            <div className="font-semibold">{formatters.formatPrice(stats.minPrice)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Máximo</div>
            <div className="font-semibold">{formatters.formatPrice(stats.maxPrice)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Variação</div>
            <div className={`font-semibold ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stats.isPositive ? '+' : ''}{formatters.formatPrice(stats.change)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Variação %</div>
            <div className={`font-semibold ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stats.isPositive ? '+' : ''}{formatters.formatPercentage(stats.changePercent)}
            </div>
          </div>
        </div>
      )}

      {/* Gráfico */}
      <div className="h-64">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={['dataMin', 'dataMax']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => formatters.formatPrice(value).replace('US$', '$')}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={stats?.isPositive ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: stats?.isPositive ? '#10b981' : '#ef4444', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Sem dados para o período</p>
            </div>
          </div>
        )}
      </div>

      {/* Informações Adicionais */}
      <div className="pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Market Cap:</span>
          <span className="font-medium">{formatters.formatMarketCap(coin.market_cap)}</span>
        </div>
        <div className="flex justify-between">
          <span>Volume 24h:</span>
          <span className="font-medium">{formatters.formatVolume(coin.total_volume)}</span>
        </div>
        {coin.market_cap_rank && (
          <div className="flex justify-between">
            <span>Ranking:</span>
            <span className="font-medium">#{coin.market_cap_rank}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoChart;
