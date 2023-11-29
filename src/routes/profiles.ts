import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { getProfile, getProfiles, editProfile, getFollowedProfiles } from '../controllers/profiles';
import { validateGetProfile, validateGetProfiles, validateEditProfile } from '../middlewares/validation';
import { uploadAvatarImage } from '../middlewares/uploadImage';

router.route('/update').patch(verifyToken, uploadAvatarImage.single('file'), validateEditProfile, editProfile);
router.route('/all/:userId').post(verifyToken, validateGetProfiles, getProfiles);
router.route('/followed/:userId').post(verifyToken, validateGetProfiles, getFollowedProfiles);
router.route('/:userId').get(verifyToken, validateGetProfile, getProfile);

export default router;
