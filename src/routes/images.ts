import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { validateGetImage } from '../middlewares/validation';
import { getCompressedDefaultImage, getCompressedImage, getDefaultImage, getImage } from '../controllers/images';

router.route('/original/default').get(getDefaultImage);
router.route('/original/:imageId').get(validateGetImage, getImage);
router.route('/compressed/default').get(getCompressedDefaultImage);
router.route('/compressed/:imageId').get(validateGetImage, getCompressedImage);

export default router;
