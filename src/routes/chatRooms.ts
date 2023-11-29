import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';
import { getChatRoom, getAllUserChatRooms } from '../controllers/chatRooms';
import { validateGetChatRoom } from '../middlewares/validation';

router.route('/all').get(verifyToken, getAllUserChatRooms);
router.route('/:userId').get(verifyToken, validateGetChatRoom, getChatRoom);

export default router;
