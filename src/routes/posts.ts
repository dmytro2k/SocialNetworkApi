import express from 'express';
import { createPost, patchPost, deletePost } from '../controllers/posts';
import { verifyToken } from '../middlewares/auth';
import { validateCreatePost, validateUpdatePost, validateDeletePost } from '../middlewares/validation';

const router = express.Router();

router
  .route('/')
  .post(verifyToken, validateCreatePost, createPost)
  .patch(verifyToken, validateUpdatePost, patchPost)
  .delete(verifyToken, validateDeletePost, deletePost);

export default router;
