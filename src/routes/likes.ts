import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';

router.route('/create').post();
router.route('/delete').delete();

export default router;
