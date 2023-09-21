import express from 'express';
import { body } from 'express-validator';
import { getPost, getUserPosts, createPost, updatePost, deletePost } from '../controllers/posts';
import { authenticateUser } from '../middlewares/auth';
import { validate } from '../middlewares/validation';

const createPostVal = [body('title').notEmpty().isString(), body('content').notEmpty().isString()];

const updatePostVal = [body('title').notEmpty().isString(), body('content').notEmpty().isString()];

const router = express.Router();

router.route('/').get(authenticateUser, getUserPosts).post(authenticateUser, createPostVal, validate, createPost);
router
  .route('/:id')
  .get(authenticateUser, getPost)
  .patch(authenticateUser, updatePostVal, validate, updatePost)
  .delete(authenticateUser, deletePost);

export default router;
