import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const router = express.Router();

//Get all products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.send(products);
  })
);

//Get product by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

export default router;
