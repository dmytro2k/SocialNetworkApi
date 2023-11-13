import express from 'express';
const router = express.Router();

import { verifyToken } from '../middlewares/auth';

router.route('/create').post();
router.route('/delete').delete();
router.route('/update').patch();

export default router;
