import Calculator from '../components/Calculator';

function CalculatorPage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Calculator</h1>
        <p className="page-description">
          A fully functional calculator built with React state management. 
          Demonstrates useState hooks for managing calculator state including display, 
          operations, and calculations.
        </p>
        
        <div className="calculator-page-content">
          <div className="calculator-section">
            <Calculator />
          </div>
          
          <div className="calculator-features">
            <h2>Features</h2>
            <ul>
              <li>Basic arithmetic operations (+, -, ×, ÷)</li>
              <li>Decimal point support</li>
              <li>Percentage calculations</li>
              <li>Positive/negative toggle</li>
              <li>Clear all functionality</li>
              <li>Real-time expression display</li>
              <li>State management with React hooks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
