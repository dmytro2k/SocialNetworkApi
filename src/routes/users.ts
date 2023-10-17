import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { getMeWithPosts, getUserWithPosts, patchProfile } from '../controllers/users';
import { uploadAvatarImage } from '../middlewares/uploadImage';
import { validateGetUserWithPosts, validatePatchProfile } from '../middlewares/validation';

router.route('/me').get(verifyToken, getMeWithPosts);
router.route('/me/profile').patch(verifyToken, uploadAvatarImage.single('file'), validatePatchProfile, patchProfile);
router.route('/:id').get(verifyToken, validateGetUserWithPosts, getUserWithPosts);

export default router;
