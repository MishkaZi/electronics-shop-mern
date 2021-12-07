import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { appendFile } from 'fs';

dotenv.config();
connectDB();
const server = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}
server.use(express.json());
server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);
server.use('/api/orders', orderRoutes);
server.use('/api/upload', uploadRoutes);

server.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
server.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, '/client/build')));

  server.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  server.get('/', (req, res) => {
    res.send('Api is running');
  });
}

server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT || 3001;

server.listen(PORT, console.log(`Server running on: ${PORT}`.yellow.bold));
