const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const orders = [];

// These URLs will change to service names when we use Docker/K8s
const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

app.get('/health', (req, res) => res.json({ status: 'order-service ok' }));

app.post('/orders', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Validate user exists
    const userRes = await axios.get(`${USER_SERVICE}/users/${userId}`);
    // Validate product exists
    const productRes = await axios.get(`${PRODUCT_SERVICE}/products/${productId}`);

    const order = {
      id: Date.now(),
      user: userRes.data,
      product: productRes.data,
      createdAt: new Date(),
    };

    orders.push(order);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Invalid user or product ID' });
  }
});

app.get('/orders', (req, res) => res.json(orders));

app.listen(3003, () => console.log('Order service running on port 3003'));
