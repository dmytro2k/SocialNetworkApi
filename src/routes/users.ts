import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { getMeWithPosts, getUserWithPosts } from '../controllers/users'
import { validateGetUserWithPosts } from '../middlewares/validation';

router.route('/me').get(verifyToken, getMeWithPosts)
router.route('/:id').get(validateGetUserWithPosts, verifyToken, getUserWithPosts)

export default router;
