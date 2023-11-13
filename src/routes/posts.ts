import express from 'express';
import { createPost, patchPost, deletePost, getPosts } from '../controllers/posts';
import { verifyToken } from '../middlewares/auth';
import { validateCreatePost, validatePatchPost, validateDeletePost, validateGetPosts } from '../middlewares/validation';
import { uploadPostImage } from '../middlewares/uploadImage';

const router = express.Router();

router
  .route('/')
  .post(verifyToken, uploadPostImage.single('file'), validateCreatePost, createPost)
  .patch(verifyToken, uploadPostImage.single('file'), validatePatchPost, patchPost)
  .delete(verifyToken, validateDeletePost, deletePost);
router.route('/:userId').get(verifyToken, validateGetPosts, getPosts);

export default router;
