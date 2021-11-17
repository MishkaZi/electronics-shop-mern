import express from 'express';
import {
  authUser,
  registerUser,
  userProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

//Register user
router.route('/').post(registerUser);
//Authenticate user
router.route('/login').post(authUser);
//Get users profile
router.route('/profile').get(protect, userProfile);

export default router;
