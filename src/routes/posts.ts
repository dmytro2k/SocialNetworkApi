import express from 'express';
import { createPost, patchPost, deletePost } from '../controllers/posts';
import { verifyToken } from '../middlewares/auth';
import { validateCreatePost, validatePatchPost, validateDeletePost } from '../middlewares/validation';
import { uploadPostImage } from '../middlewares/uploadImage';

const router = express.Router();

router
  .route('/')
  .post(verifyToken, uploadPostImage.single('file'), validateCreatePost, createPost)
  .patch(verifyToken, uploadPostImage.single('file'), validatePatchPost, patchPost)
  .delete(verifyToken, validateDeletePost, deletePost);

export default router;
