import express from 'express';
import { createPost, editPost, deletePost, getPosts, getPostsOfFollowedUsers } from '../controllers/posts';
import { verifyToken } from '../middlewares/auth';
import { validateCreatePost, validateEditPost, validateDeletePost, validateGetPosts } from '../middlewares/validation';
import { uploadPostImage } from '../middlewares/uploadImage';

const router = express.Router();

router
  .route('/')
  .post(verifyToken, uploadPostImage.single('file'), validateCreatePost, createPost)
  .patch(verifyToken, uploadPostImage.single('file'), validateEditPost, editPost)
  .delete(verifyToken, validateDeletePost, deletePost)
  .get(verifyToken, getPostsOfFollowedUsers);
router.route('/:userId').get(verifyToken, validateGetPosts, getPosts);

export default router;
