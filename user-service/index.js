const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// In-memory "database" for now
const users = [];

app.get('/health', (req, res) => res.json({ status: 'user-service ok' }));

app.post('/users', (req, res) => {
  const user = { id: Date.now(), name: req.body.name, email: req.body.email };
  users.push(user);
  res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(3001, () => console.log('User service running on port 3001'));
