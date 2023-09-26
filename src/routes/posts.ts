import express from 'express';
import { getPost, getUserPosts, createPost, updatePost, deletePost } from '../controllers/posts';
import { authenticateUser } from '../middlewares/auth';
import { validatePost } from '../middlewares/validation';

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, getUserPosts)
  .post(authenticateUser, validatePost, createPost);
router
  .route('/:id')
  .get(authenticateUser, getPost)
  .patch(authenticateUser, validatePost, updatePost)
  .delete(authenticateUser, deletePost);

export default router;
