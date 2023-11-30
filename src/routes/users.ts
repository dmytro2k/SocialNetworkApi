import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { deleteUser } from '../controllers/users';
const router = express.Router();

router.route('/').delete(verifyToken, deleteUser);

export default router;
