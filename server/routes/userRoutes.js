import express from 'express';
import {
  authUser,
  registerUser,
  updateProfile,
  userProfile,
  allUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

//Register user, get all users
router.route('/').post(registerUser).get(protect, admin, allUsers);
//Authenticate user
router.route('/login').post(authUser);
//Get and update  users profile
router.route('/profile').get(protect, userProfile).put(protect, updateProfile);

export default router;
