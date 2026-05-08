import { useState, useEffect } from 'react';
import { getOrders, createOrder } from '../api';

export default function Orders() {
  const [orders, setOrders]       = useState([]);
  const [userId, setUserId]       = useState('');
  const [productId, setProductId] = useState('');
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(null);

  const load = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch {
      setError('Could not load orders');
    }
  };

  useEffect(() => { load(); }, []);

  const handleOrder = async () => {
    setError(''); setSuccess(null);
    if (!userId || !productId) return setError('Both User ID and Product ID are required');
    try {
      const res = await createOrder({ userId: Number(userId), productId: Number(productId) });
      setSuccess(res.data);
      setUserId(''); setProductId('');
      load();
    } catch {
      setError('Failed — make sure User ID and Product ID are valid');
    }
  };

  return (
    <div style={s.page}>
      <h2 style={s.heading}>🛒 Orders</h2>

      <div style={s.card}>
        <h3 style={s.cardTitle}>Place an Order</h3>
        <input style={s.input} placeholder="User ID"    value={userId}    onChange={e => setUserId(e.target.value)} />
        <input style={s.input} placeholder="Product ID" value={productId} onChange={e => setProductId(e.target.value)} />
        <button style={s.btn} onClick={handleOrder}>Place Order</button>
      </div>

      {error   && <div style={s.error}>{error}</div>}
      {success && <pre style={s.result}>{JSON.stringify(success, null, 2)}</pre>}

      <h3 style={{ marginBottom: '0.75rem' }}>All Orders ({orders.length})</h3>
      {orders.length === 0 && <p style={{ color: '#888' }}>No orders yet.</p>}
      {orders.map(o => (
        <div key={o.id} style={s.item}>
          <div>
            <strong>{o.user?.name}</strong> ordered <strong>{o.product?.name}</strong>
          </div>
          <div style={s.meta}>${o.product?.price} · {new Date(o.createdAt).toLocaleTimeString()}</div>
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
  result:    { background: '#1e1e1e', color: '#80ff80', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' },
  item:      { background: '#fff', padding: '0.9rem 1rem', marginBottom: '0.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  meta:      { fontSize: '0.85rem', color: '#666', marginTop: '0.3rem' },
};
