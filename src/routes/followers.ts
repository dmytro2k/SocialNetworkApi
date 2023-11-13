import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { createFollower, deleteFollower } from '../controllers/followers';
import { validateCreateFollower, validateDeleteFollower } from '../middlewares/validation';

router
  .route('/:userId')
  .post(verifyToken, validateCreateFollower, createFollower)
  .delete(verifyToken, validateDeleteFollower, deleteFollower);

export default router;
