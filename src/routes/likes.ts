import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { validateLike } from '../middlewares/validation';
import { createLike, deleteLike } from '../controllers/likes';

router.route('/:postId').post(verifyToken, validateLike, createLike).delete(verifyToken, validateLike, deleteLike);

export default router;
