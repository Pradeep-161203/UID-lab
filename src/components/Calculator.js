import { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const equals = () => {
    const inputValue = parseFloat(display);

    if (previousValue === null || operation === null) {
      return;
    }

    const newValue = calculate(previousValue, inputValue, operation);
    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const percentage = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const plusMinus = () => {
    const currentValue = parseFloat(display);
    const newValue = -currentValue;
    setDisplay(String(newValue));
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-display">
          <div className="calculator-expression">
            {previousValue !== null && operation && (
              <span>{previousValue} {operation}</span>
            )}
          </div>
          <div className="calculator-current">
            {display}
          </div>
        </div>
        
        <div className="calculator-keypad">
          <div className="calculator-row">
            <button className="calculator-key function" onClick={clear}>
              AC
            </button>
            <button className="calculator-key function" onClick={plusMinus}>
              ±
            </button>
            <button className="calculator-key function" onClick={percentage}>
              %
            </button>
            <button 
              className={`calculator-key operator ${operation === '÷' ? 'active' : ''}`}
              onClick={() => performOperation('÷')}
            >
              ÷
            </button>
          </div>
          
          <div className="calculator-row">
            <button className="calculator-key" onClick={() => inputDigit(7)}>
              7
            </button>
            <button className="calculator-key" onClick={() => inputDigit(8)}>
              8
            </button>
            <button className="calculator-key" onClick={() => inputDigit(9)}>
              9
            </button>
            <button 
              className={`calculator-key operator ${operation === '×' ? 'active' : ''}`}
              onClick={() => performOperation('×')}
            >
              ×
            </button>
          </div>
          
          <div className="calculator-row">
            <button className="calculator-key" onClick={() => inputDigit(4)}>
              4
            </button>
            <button className="calculator-key" onClick={() => inputDigit(5)}>
              5
            </button>
            <button className="calculator-key" onClick={() => inputDigit(6)}>
              6
            </button>
            <button 
              className={`calculator-key operator ${operation === '-' ? 'active' : ''}`}
              onClick={() => performOperation('-')}
            >
              -
            </button>
          </div>
          
          <div className="calculator-row">
            <button className="calculator-key" onClick={() => inputDigit(1)}>
              1
            </button>
            <button className="calculator-key" onClick={() => inputDigit(2)}>
              2
            </button>
            <button className="calculator-key" onClick={() => inputDigit(3)}>
              3
            </button>
            <button 
              className={`calculator-key operator ${operation === '+' ? 'active' : ''}`}
              onClick={() => performOperation('+')}
            >
              +
            </button>
          </div>
          
          <div className="calculator-row">
            <button className="calculator-key zero" onClick={() => inputDigit(0)}>
              0
            </button>
            <button className="calculator-key" onClick={inputDecimal}>
              .
            </button>
            <button className="calculator-key equals" onClick={equals}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
