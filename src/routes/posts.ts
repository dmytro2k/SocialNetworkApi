import express from 'express';
import { createPost, patchPost, deletePost } from '../controllers/posts';
import { verifyToken } from '../middlewares/auth';
import { validateCreatePost, validateUpdatePost, validateDeletePost } from '../middlewares/validation';
import { uploadPostImage } from '../middlewares/uploadImage';

const router = express.Router();

router
  .route('/')
  .post(verifyToken, uploadPostImage.single('file'), validateCreatePost, createPost)
  .patch(verifyToken, uploadPostImage.single('file'), validateUpdatePost, patchPost)
  .delete(verifyToken, validateDeletePost, deletePost);

export default router;
