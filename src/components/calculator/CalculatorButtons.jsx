import React from 'react'

const CalculatorButtons = ({ onButtonClick, isAdvancedMode }) => {
  const basicButtons = [
    // Row 1
    [
      { label: '(', value: '(', type: 'operator', className: 'bg-gray-600 hover:bg-gray-500' },
      { label: ')', value: ')', type: 'operator', className: 'bg-gray-600 hover:bg-gray-500' },
      { label: '%', value: '%', type: 'operator', className: 'bg-gray-600 hover:bg-gray-500' },
      { label: '÷', value: '/', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' }
    ],
    // Row 2
    [
      { label: '7', value: '7', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '8', value: '8', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '9', value: '9', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '×', value: '*', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' }
    ],
    // Row 3
    [
      { label: '4', value: '4', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '5', value: '5', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '6', value: '6', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '−', value: '-', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' }
    ],
    // Row 4
    [
      { label: '1', value: '1', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '2', value: '2', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '3', value: '3', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '+', value: '+', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' }
    ],
    // Row 5
    [
      { label: '0', value: '0', type: 'number', className: 'bg-gray-700 hover:bg-gray-600 col-span-2' },
      { label: '.', value: '.', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '=', value: '=', type: 'equals', className: 'bg-blue-600 hover:bg-blue-500' }
    ]
  ]

  const advancedButtons = [
    // Row 1 - Scientific Functions
    [
      { label: 'sin', value: 'sin', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: 'cos', value: 'cos', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: 'tan', value: 'tan', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: 'ln', value: 'ln', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: 'log', value: 'log', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' }
    ],
    // Row 2 - Powers and Roots
    [
      { label: 'x²', value: '^2', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: 'x³', value: '^3', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: 'xʸ', value: '^', type: 'operator', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: '√', value: 'sqrt', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' },
      { label: '∛', value: 'cbrt', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' }
    ],
    // Row 3 - Memory and Constants
    [
      { label: 'MC', value: 'MC', type: 'memory', className: 'bg-blue-600 hover:bg-blue-500' },
      { label: 'MR', value: 'MR', type: 'memory', className: 'bg-blue-600 hover:bg-blue-500' },
      { label: 'M+', value: 'M+', type: 'memory', className: 'bg-blue-600 hover:bg-blue-500' },
      { label: 'M-', value: 'M-', type: 'memory', className: 'bg-blue-600 hover:bg-blue-500' },
      { label: 'π', value: 'pi', type: 'constant', className: 'bg-green-600 hover:bg-green-500' }
    ],
    // Row 4 - Basic Operations
    [
      { label: '(', value: '(', type: 'operator', className: 'bg-gray-600 hover:bg-gray-500' },
      { label: ')', value: ')', type: 'operator', className: 'bg-gray-600 hover:bg-gray-500' },
      { label: '%', value: '%', type: 'operator', className: 'bg-gray-600 hover:bg-gray-500' },
      { label: '÷', value: '/', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' },
      { label: 'e', value: 'e', type: 'constant', className: 'bg-green-600 hover:bg-green-500' }
    ],
    // Row 5-8 - Numbers and operators (same as basic)
    [
      { label: '7', value: '7', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '8', value: '8', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '9', value: '9', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '×', value: '*', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' },
      { label: '!', value: '!', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' }
    ],
    [
      { label: '4', value: '4', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '5', value: '5', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '6', value: '6', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '−', value: '-', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' },
      { label: '1/x', value: '1/x', type: 'function', className: 'bg-purple-600 hover:bg-purple-500' }
    ],
    [
      { label: '1', value: '1', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '2', value: '2', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '3', value: '3', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '+', value: '+', type: 'operator', className: 'bg-orange-600 hover:bg-orange-500' },
      { label: '±', value: '±', type: 'function', className: 'bg-gray-600 hover:bg-gray-500' }
    ],
    [
      { label: '0', value: '0', type: 'number', className: 'bg-gray-700 hover:bg-gray-600 col-span-2' },
      { label: '.', value: '.', type: 'number', className: 'bg-gray-700 hover:bg-gray-600' },
      { label: '=', value: '=', type: 'equals', className: 'bg-blue-600 hover:bg-blue-500 col-span-2' }
    ]
  ]

  const buttons = isAdvancedMode ? advancedButtons : basicButtons
  const gridCols = isAdvancedMode ? 'grid-cols-5' : 'grid-cols-4'

  const handleClick = (button) => {
    onButtonClick(button.value, button.type)
  }

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {buttons.map((row, rowIndex) => 
        row.map((button, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleClick(button)}
            className={`
              ${button.className}
              ${button.label === '0' && !isAdvancedMode ? 'col-span-2' : ''}
              ${button.label === '=' && isAdvancedMode ? 'col-span-2' : ''}
              h-14 rounded-lg text-white font-semibold text-lg
              transition-all duration-150 active:scale-95
              border border-white/10 shadow-lg
              hover:shadow-xl hover:border-white/20
            `}
          >
            {button.label}
          </button>
        ))
      )}
    </div>
  )
}

export default CalculatorButtons
