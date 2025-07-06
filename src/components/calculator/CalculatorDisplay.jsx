import React from 'react'

const CalculatorDisplay = ({ display, memory, isAdvancedMode }) => {
  const formatDisplay = (value) => {
    if (value === 'Error') return value
    if (value === '0') return '0'
    
    // Handle very large or very small numbers with scientific notation
    const num = parseFloat(value)
    if (!isNaN(num)) {
      if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6)
      }
      // Format with commas for readability
      return num.toLocaleString('pt-BR', { maximumFractionDigits: 10 })
    }
    
    return value
  }

  return (
    <div className="mb-6">
      {/* Memory Indicator */}
      {memory !== 0 && (
        <div className="text-right mb-2">
          <span className="text-blue-300 text-sm bg-blue-600/20 px-2 py-1 rounded">
            M: {memory.toLocaleString('pt-BR')}
          </span>
        </div>
      )}

      {/* Main Display */}
      <div className="bg-black/30 rounded-xl p-6 border border-white/10">
        <div className="text-right">
          {/* Expression Display (for advanced mode) */}
          {isAdvancedMode && display.expression && (
            <div className="text-gray-400 text-sm mb-2 min-h-[20px] break-all">
              {display.expression}
            </div>
          )}
          
          {/* Main Result Display */}
          <div className="text-white text-4xl md:text-5xl font-mono font-light min-h-[60px] flex items-center justify-end break-all">
            {formatDisplay(display.current)}
          </div>
          
          {/* Previous Result (if any) */}
          {display.previous && (
            <div className="text-gray-400 text-lg mt-2">
              = {formatDisplay(display.previous)}
            </div>
          )}
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="flex justify-between items-center mt-3 text-sm">
        <div className="text-gray-400">
          {isAdvancedMode ? 'Modo Científico' : 'Modo Básico'}
        </div>
        
        {/* Angle Mode for Advanced Calculator */}
        {isAdvancedMode && (
          <div className="text-blue-300">
            DEG
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculatorDisplay
