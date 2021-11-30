import express from 'express';
import {
  createNewOrder,
  getOrderById,
  getOrdersForUser,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

//Create new order
router.route('/').post(protect, createNewOrder);
router.route('/myorders').get(protect, getOrdersForUser);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
