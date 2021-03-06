import express from 'express';
import {
  createNewOrder,
  getOrderById,
  getOrders,
  getOrdersForUser,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

//Create new order
router.route('/').post(protect, createNewOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getOrdersForUser);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
