import { useState } from 'react';
import { createUser, getUser } from '../api';

export default function Users() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [lookupId, setLookupId] = useState('');
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');

  const handleCreate = async () => {
    setError(''); setResult(null);
    if (!name || !email) return setError('Name and email are required');
    try {
      const res = await createUser({ name, email });
      setResult(res.data);
      setName(''); setEmail('');
    } catch {
      setError('Failed to create user');
    }
  };

  const handleLookup = async () => {
    setError(''); setResult(null);
    if (!lookupId) return setError('Enter a user ID');
    try {
      const res = await getUser(lookupId);
      setResult(res.data);
    } catch {
      setError('User not found');
    }
  };

  return (
    <div style={s.page}>
      <h2 style={s.heading}>👤 Users</h2>

      <div style={s.card}>
        <h3 style={s.cardTitle}>Create User</h3>
        <input style={s.input} placeholder="Name"  value={name}  onChange={e => setName(e.target.value)} />
        <input style={s.input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button style={s.btn} onClick={handleCreate}>Create User</button>
      </div>

      <div style={s.card}>
        <h3 style={s.cardTitle}>Lookup User by ID</h3>
        <input style={s.input} placeholder="Paste user ID here" value={lookupId} onChange={e => setLookupId(e.target.value)} />
        <button style={s.btn} onClick={handleLookup}>Find User</button>
      </div>

      {error  && <div style={s.error}>{error}</div>}
      {result && <pre style={s.result}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

const s = {
  page:      { padding: '2rem', maxWidth: '600px' },
  heading:   { marginBottom: '1.5rem', fontSize: '1.5rem' },
  card:      { background: '#fff', padding: '1.5rem', borderRadius: '10px', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  cardTitle: { marginBottom: '1rem', color: '#333' },
  input:     { display: 'block', width: '100%', padding: '0.6rem', marginBottom: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' },
  btn:       { padding: '0.6rem 1.2rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' },
  error:     { background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '6px', marginTop: '1rem' },
  result:    { background: '#1e1e1e', color: '#80ff80', padding: '1rem', borderRadius: '8px', marginTop: '1rem', fontSize: '0.85rem' },
};
