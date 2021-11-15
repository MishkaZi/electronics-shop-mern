import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const server = express();
server.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, console.log(`Server running on: ${PORT}`.yellow.bold));
