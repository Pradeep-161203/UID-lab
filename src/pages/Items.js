import React, { useState } from 'react';

function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: 1 });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    if (form.quantity <= 0 || !Number.isFinite(form.quantity)) {
      setError('Quantity must be a positive number');
      return;
    }
    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      quantity: Math.floor(form.quantity)
    };
    setItems((prev) => [newItem, ...prev]);
    setForm({ name: '', description: '', quantity: 1 });
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h2>Items</h2>
      <p>Add new items with name, description, and quantity.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
        {error && <div style={{ color: '#b91c1c' }}>{error}</div>}

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Item name"
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Short description (optional)"
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={form.quantity}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <button type="submit" className="btn">Add Item</button>
        </div>
      </form>

      <div style={{ marginTop: 20 }}>
        <h3>Current Items ({items.length})</h3>
        {items.length === 0 ? (
          <p>No items yet. Add your first item above.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10 }}>
            {items.map((item) => (
              <li key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    {item.description && (
                      <div style={{ color: '#6b7280', marginTop: 4 }}>{item.description}</div>
                    )}
                  </div>
                  <div style={{ whiteSpace: 'nowrap' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <button onClick={() => handleRemove(item.id)} className="btn">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Items;


