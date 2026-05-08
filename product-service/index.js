const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
];

app.get('/health', (req, res) => res.json({ status: 'product-service ok' }));

app.get('/products', (req, res) => res.json(products));

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/products', (req, res) => {
  const product = { id: Date.now(), name: req.body.name, price: req.body.price };
  products.push(product);
  res.status(201).json(product);
});

app.listen(3002, () => console.log('Product service running on port 3002'));
