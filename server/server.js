import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const server = express();
server.use(express.json());
server.use('/api/products', productRoutes);
server.use('/api/users', userRoutes);

server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT || 3001;

server.listen(PORT, console.log(`Server running on: ${PORT}`.yellow.bold));
