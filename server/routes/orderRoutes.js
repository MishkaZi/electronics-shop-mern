import express from 'express';
import { createNewOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

//Create new order
router.route('/').post(protect, createNewOrder);

export default router;
