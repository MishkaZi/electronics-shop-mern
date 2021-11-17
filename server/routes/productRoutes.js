import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
const router = express.Router();

//Get all products
router.route('/').get(getProducts);

//Get product by ID
router.route('/:id').get(getProductById);

export default router;
