import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { getProfile, getProfiles, updateMyProfile, getFollowedProfiles } from '../controllers/profiles';
import { validateGetProfile, validateGetProfiles, validateUpdateMyProfile } from '../middlewares/validation';
import { uploadAvatarImage } from '../middlewares/uploadImage';

router.route('/update').patch(verifyToken, uploadAvatarImage.single('file'), validateUpdateMyProfile, updateMyProfile);
router.route('/all').get(verifyToken, validateGetProfiles, getProfiles);
router.route('/followed').get(verifyToken, validateGetProfiles, getFollowedProfiles);
router.route('/:userId').get(verifyToken, validateGetProfile, getProfile);

export default router;
