import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { getAllMessages } from '../controllers/messages';
import { validateGetAllMessages } from '../middlewares/validation';

router.route('/:chatRoomId').get(verifyToken, validateGetAllMessages, getAllMessages);

export default router;
