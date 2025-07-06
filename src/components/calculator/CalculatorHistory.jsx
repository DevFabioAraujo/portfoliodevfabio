import React from 'react'
import { History, Trash2, Clock } from 'lucide-react'

const CalculatorHistory = ({ history, onClearHistory, onSelectHistoryItem }) => {
  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toLocaleString('pt-BR', { maximumFractionDigits: 6 })
    }
    return num
  }

  const handleHistoryClick = (item) => {
    onSelectHistoryItem(item.result.toString(), 'number')
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-blue-300" />
          <h3 className="text-lg font-semibold text-white">Histórico</h3>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Limpar histórico"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* History List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Nenhum cálculo realizado ainda</p>
          </div>
        ) : (
          history.slice().reverse().map((item, index) => (
            <div
              key={history.length - 1 - index}
              onClick={() => handleHistoryClick(item)}
              className="bg-white/5 hover:bg-white/10 rounded-lg p-3 cursor-pointer transition-colors border border-white/5 hover:border-white/20"
            >
              {/* Expression */}
              <div className="text-gray-300 text-sm mb-1 break-all">
                {item.expression}
              </div>
              
              {/* Result */}
              <div className="text-white font-mono text-lg break-all">
                = {formatNumber(item.result)}
              </div>
              
              {/* Timestamp */}
              <div className="text-gray-500 text-xs mt-2">
                {new Date(item.timestamp).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-gray-400 text-sm">
            <div className="flex justify-between">
              <span>Total de cálculos:</span>
              <span className="text-blue-300">{history.length}</span>
            </div>
            {history.length > 0 && (
              <div className="flex justify-between mt-1">
                <span>Último resultado:</span>
                <span className="text-green-300">
                  {formatNumber(history[history.length - 1].result)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-gray-500 text-xs">
          <p className="mb-1">💡 <strong>Dica:</strong></p>
          <p>Clique em qualquer resultado do histórico para reutilizá-lo</p>
        </div>
      </div>
    </div>
  )
}

export default CalculatorHistory
