import axios from 'axios';

const USER_API    = 'http://localhost:3001';
const PRODUCT_API = 'http://localhost:3002';
const ORDER_API   = 'http://localhost:3003';

// Users
export const createUser  = (data) => axios.post(`${USER_API}/users`, data);
export const getUser     = (id)   => axios.get(`${USER_API}/users/${id}`);

// Products
export const getProducts  = ()     => axios.get(`${PRODUCT_API}/products`);
export const createProduct = (data) => axios.post(`${PRODUCT_API}/products`, data);

// Orders
export const getOrders   = ()     => axios.get(`${ORDER_API}/orders`);
export const createOrder = (data) => axios.post(`${ORDER_API}/orders`, data);
