import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { createComment, deleteComment, editComment, getComments } from '../controllers/comments';
import { validateCreateComment, validateDeleteComment, validateEditComment, validateGetComments } from '../middlewares/validation';

router
  .route('/')
  .post(verifyToken, validateCreateComment, createComment)
  .delete(verifyToken, validateDeleteComment, deleteComment)
  .patch(verifyToken, validateEditComment, editComment);
router.route('/:postId').get(validateGetComments, getComments);

export default router;
