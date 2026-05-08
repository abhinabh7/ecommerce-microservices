import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Users    from './pages/Users';
import Products from './pages/Products';
import Orders   from './pages/Orders';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={s.nav}>
        <span style={s.brand}>🛍️ E-Commerce</span>
        <NavLink to="/users"    style={navStyle}>Users</NavLink>
        <NavLink to="/products" style={navStyle}>Products</NavLink>
        <NavLink to="/orders"   style={navStyle}>Orders</NavLink>
      </nav>

      <div style={s.content}>
        <Routes>
          <Route path="/"         element={<Products />} />
          <Route path="/users"    element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders"   element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const navStyle = ({ isActive }) => ({
  marginLeft: '1.5rem',
  color: isActive ? '#4f46e5' : '#555',
  fontWeight: isActive ? '700' : '400',
  textDecoration: 'none',
  fontSize: '0.95rem',
});

const s = {
  nav:     { display: 'flex', alignItems: 'center', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #eee', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  brand:   { fontWeight: '700', fontSize: '1.2rem', marginRight: 'auto' },
  content: { padding: '1rem' },
};
