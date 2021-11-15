import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
server.get('/api/products', (req, res) => {
  res.send(products);
});

server.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, console.log('Server running on: ' + PORT));
