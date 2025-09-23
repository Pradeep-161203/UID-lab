import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const parsedStep = Number.isFinite(step) && step > 0 ? Math.floor(step) : 1;

  const handleIncrement = () => {
    setCount((c) => c + parsedStep);
  };

  const handleDecrement = () => {
    setCount((c) => c - parsedStep);
  };

  const handleReset = () => {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h2>Counter</h2>
      <p>Increment or decrement by a selected step.</p>
      <div style={{ fontSize: 48, fontWeight: 700, margin: '16px 0' }}>{count}</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 12, maxWidth: 420 }}>
        <label htmlFor="step">
          Step value
          <input
            id="step"
            type="number"
            min="1"
            inputMode="numeric"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
        <button onClick={handleReset} className="btn">Reset</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12, maxWidth: 420 }}>
        <button onClick={handleDecrement} className="btn">- Decrement</button>
        <button onClick={handleIncrement} className="btn">+ Increment</button>
      </div>
    </div>
  );
}

export default Counter;


