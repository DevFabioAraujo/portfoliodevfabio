import { useState, useCallback } from 'react'

export const useCalculator = () => {
  const [display, setDisplay] = useState({
    current: '0',
    previous: '',
    expression: ''
  })
  const [history, setHistory] = useState([])
  const [memory, setMemory] = useState(0)
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [lastOperation, setLastOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  // Mathematical functions
  const mathFunctions = {
    sin: (x) => Math.sin(x * Math.PI / 180),
    cos: (x) => Math.cos(x * Math.PI / 180),
    tan: (x) => Math.tan(x * Math.PI / 180),
    ln: (x) => Math.log(x),
    log: (x) => Math.log10(x),
    sqrt: (x) => Math.sqrt(x),
    cbrt: (x) => Math.cbrt(x),
    factorial: (n) => {
      if (n < 0) return NaN
      if (n === 0 || n === 1) return 1
      let result = 1
      for (let i = 2; i <= n; i++) {
        result *= i
      }
      return result
    }
  }

  // Constants
  const constants = {
    pi: Math.PI,
    e: Math.E
  }

  // Safe evaluation function
  const safeEval = (expression) => {
    try {
      // Replace mathematical symbols with JavaScript operators
      let processedExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/\^/g, '**')

      // Handle percentage
      processedExpression = processedExpression.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)')

      // Evaluate the expression
      const result = Function('"use strict"; return (' + processedExpression + ')')()
      
      if (!isFinite(result)) {
        return 'Error'
      }
      
      return result
    } catch {
      return 'Error'
    }
  }

  // Handle number input
  const inputNumber = useCallback((num) => {
    if (waitingForOperand) {
      setDisplay(prev => ({
        ...prev,
        current: num,
        expression: prev.expression + num
      }))
      setWaitingForOperand(false)
    } else {
      setDisplay(prev => ({
        ...prev,
        current: prev.current === '0' ? num : prev.current + num,
        expression: prev.expression === '0' ? num : prev.expression + num
      }))
    }
  }, [waitingForOperand])

  // Handle operator input
  const inputOperator = useCallback((nextOperator) => {
    const inputValue = parseFloat(display.current)

    if (display.previous === '') {
      setDisplay(prev => ({
        ...prev,
        previous: inputValue.toString(),
        expression: prev.expression + ' ' + nextOperator + ' '
      }))
    } else if (!waitingForOperand) {
      const currentValue = parseFloat(display.previous)
      const newValue = calculate(currentValue, inputValue, lastOperation)

      setDisplay({
        current: String(newValue),
        previous: String(newValue),
        expression: display.expression + ' ' + nextOperator + ' '
      })
    } else {
      setDisplay(prev => ({
        ...prev,
        expression: prev.expression.slice(0, -3) + ' ' + nextOperator + ' '
      }))
    }

    setWaitingForOperand(true)
    setLastOperation(nextOperator)
  }, [display, lastOperation, waitingForOperand])

  // Basic calculation function
  const calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '*':
        return firstOperand * secondOperand
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 'Error'
      case '^':
        return Math.pow(firstOperand, secondOperand)
      case '%':
        return firstOperand % secondOperand
      default:
        return secondOperand
    }
  }

  // Handle equals
  const performCalculation = useCallback(() => {
    if (display.expression && display.expression !== '0') {
      const result = safeEval(display.expression)
      
      if (result !== 'Error') {
        // Add to history
        const historyItem = {
          expression: display.expression,
          result: result,
          timestamp: new Date().toISOString()
        }
        
        setHistory(prev => [...prev, historyItem])
      }

      setDisplay({
        current: String(result),
        previous: '',
        expression: ''
      })
      setWaitingForOperand(true)
      setLastOperation(null)
    }
  }, [display.expression])

  // Handle function operations
  const performFunction = useCallback((func) => {
    const currentValue = parseFloat(display.current)
    let result

    switch (func) {
      case '^2':
        result = Math.pow(currentValue, 2)
        break
      case '^3':
        result = Math.pow(currentValue, 3)
        break
      case '1/x':
        result = currentValue !== 0 ? 1 / currentValue : 'Error'
        break
      case '±':
        result = -currentValue
        break
      case '!':
        result = mathFunctions.factorial(Math.floor(currentValue))
        break
      default:
        if (mathFunctions[func]) {
          result = mathFunctions[func](currentValue)
        } else {
          result = 'Error'
        }
    }

    if (result !== 'Error') {
      const expression = `${func}(${currentValue})`
      const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toISOString()
      }
      setHistory(prev => [...prev, historyItem])
    }

    setDisplay({
      current: String(result),
      previous: '',
      expression: ''
    })
    setWaitingForOperand(true)
  }, [display.current])

  // Handle constants
  const inputConstant = useCallback((constant) => {
    const value = constants[constant]
    if (value !== undefined) {
      setDisplay(prev => ({
        ...prev,
        current: String(value),
        expression: waitingForOperand ? constant : prev.expression + constant
      }))
      setWaitingForOperand(false)
    }
  }, [waitingForOperand])

  // Memory operations
  const memoryOperation = useCallback((operation) => {
    const currentValue = parseFloat(display.current)
    
    switch (operation) {
      case 'MC':
        setMemory(0)
        break
      case 'MR':
        setDisplay(prev => ({
          ...prev,
          current: String(memory),
          expression: waitingForOperand ? String(memory) : prev.expression + String(memory)
        }))
        setWaitingForOperand(false)
        break
      case 'M+':
        setMemory(prev => prev + currentValue)
        break
      case 'M-':
        setMemory(prev => prev - currentValue)
        break
      default:
        break
    }
  }, [display.current, memory, waitingForOperand])

  // Main button click handler
  const handleButtonClick = useCallback((value, type) => {
    switch (type) {
      case 'number':
        if (value === '.') {
          if (display.current.indexOf('.') === -1) {
            inputNumber(value)
          }
        } else {
          inputNumber(value)
        }
        break
      case 'operator':
        inputOperator(value)
        break
      case 'equals':
        performCalculation()
        break
      case 'function':
        performFunction(value)
        break
      case 'constant':
        inputConstant(value)
        break
      case 'memory':
        memoryOperation(value)
        break
      default:
        break
    }
  }, [display.current, inputNumber, inputOperator, performCalculation, performFunction, inputConstant, memoryOperation])

  // Clear functions
  const clearAll = useCallback(() => {
    setDisplay({
      current: '0',
      previous: '',
      expression: ''
    })
    setWaitingForOperand(false)
    setLastOperation(null)
  }, [])

  const clearEntry = useCallback(() => {
    setDisplay(prev => ({
      ...prev,
      current: '0'
    }))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const toggleAdvancedMode = useCallback(() => {
    setIsAdvancedMode(prev => !prev)
  }, [])

  return {
    display,
    history,
    memory,
    isAdvancedMode,
    handleButtonClick,
    clearAll,
    clearEntry,
    clearHistory,
    toggleAdvancedMode
  }
}
