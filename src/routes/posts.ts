import express from 'express';
import { getPost, getUserPosts, createPost, updatePost, deletePost } from '../controllers/posts';
import { authenticateUser } from '../middlewares/auth';
import { validateCreatePost, validateUpdatePost, validateGetPosts, validateMinimalPost } from '../middlewares/validation';

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, validateGetPosts, getUserPosts)
  .post(authenticateUser, validateCreatePost, createPost);
router
  .route('/:id')
  .get(authenticateUser, validateMinimalPost, getPost)
  .patch(authenticateUser, validateUpdatePost, updatePost)
  .delete(authenticateUser, validateMinimalPost, deletePost);

export default router;
