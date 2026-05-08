import { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName]         = useState('');
  const [price, setPrice]       = useState('');
  const [error, setError]       = useState('');

  const load = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      setError('Could not load products');
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setError('');
    if (!name || !price) return setError('Name and price are required');
    try {
      await createProduct({ name, price: Number(price) });
      setName(''); setPrice('');
      load();
    } catch {
      setError('Failed to add product');
    }
  };

  return (
    <div style={s.page}>
      <h2 style={s.heading}>📦 Products</h2>

      <div style={s.card}>
        <h3 style={s.cardTitle}>Add Product</h3>
        <input style={s.input} placeholder="Product name" value={name}  onChange={e => setName(e.target.value)} />
        <input style={s.input} placeholder="Price (USD)"  value={price} onChange={e => setPrice(e.target.value)} type="number" />
        <button style={s.btn} onClick={handleCreate}>Add Product</button>
      </div>

      {error && <div style={s.error}>{error}</div>}

      <h3 style={{ marginBottom: '0.75rem' }}>All Products</h3>
      {products.length === 0 && <p style={{ color: '#888' }}>No products yet.</p>}
      {products.map(p => (
        <div key={p.id} style={s.item}>
          <div>
            <strong>{p.name}</strong>
            <span style={s.badge}>ID: {p.id}</span>
          </div>
          <strong style={{ color: '#4f46e5' }}>${p.price}</strong>
        </div>
      ))}
    </div>
  );
}

const s = {
  page:      { padding: '2rem', maxWidth: '600px' },
  heading:   { marginBottom: '1.5rem', fontSize: '1.5rem' },
  card:      { background: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  cardTitle: { marginBottom: '1rem', color: '#333' },
  input:     { display: 'block', width: '100%', padding: '0.6rem', marginBottom: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' },
  btn:       { padding: '0.6rem 1.2rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' },
  error:     { background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' },
  item:      { background: '#fff', padding: '0.9rem 1rem', marginBottom: '0.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge:     { marginLeft: '0.75rem', fontSize: '0.75rem', color: '#888', background: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px' },
};
