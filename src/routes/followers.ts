import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { createFollower, deleteFollower } from '../controllers/followers';
import { validateFollower } from '../middlewares/validation';

router.route('/:userId').post(verifyToken, validateFollower, createFollower).delete(verifyToken, validateFollower, deleteFollower);

export default router;
