import express from 'express';
import {
  authUser,
  registerUser,
  updateProfile,
  userProfile,
  allUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, allUsers);

router.route('/login').post(authUser);

router.route('/profile').get(protect, userProfile).put(protect, updateProfile);

router.route('/:id').delete(protect, admin, deleteUser);

export default router;
