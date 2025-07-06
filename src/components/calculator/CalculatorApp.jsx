import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Delete, RotateCcw } from 'lucide-react'
import CalculatorDisplay from './CalculatorDisplay'
import CalculatorButtons from './CalculatorButtons'
import CalculatorHistory from './CalculatorHistory'
import { useCalculator } from '../../hooks/useCalculator'

const CalculatorApp = () => {
  const {
    display,
    history,
    isAdvancedMode,
    memory,
    handleButtonClick,
    clearAll,
    clearEntry,
    clearHistory,
    toggleAdvancedMode
  } = useCalculator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar ao Portfólio</span>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Calculadora Avançada</h1>
              <p className="text-blue-200 text-sm">Calculadora científica e financeira</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAdvancedMode}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  isAdvancedMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isAdvancedMode ? 'Científica' : 'Básica'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calculator Main */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-2xl">
              {/* Display */}
              <CalculatorDisplay 
                display={display}
                memory={memory}
                isAdvancedMode={isAdvancedMode}
              />

              {/* Action Buttons */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button
                    onClick={clearEntry}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                  >
                    <Delete className="w-4 h-4" />
                    <span>CE</span>
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>C</span>
                  </button>
                </div>
                
                {memory !== 0 && (
                  <div className="bg-blue-600/20 text-blue-200 px-3 py-1 rounded-lg text-sm">
                    M: {memory}
                  </div>
                )}
              </div>

              {/* Calculator Buttons */}
              <CalculatorButtons 
                onButtonClick={handleButtonClick}
                isAdvancedMode={isAdvancedMode}
              />
            </div>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <CalculatorHistory 
              history={history}
              onClearHistory={clearHistory}
              onSelectHistoryItem={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorApp
