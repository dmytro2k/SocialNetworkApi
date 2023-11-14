import express from 'express';
import { login, register } from '../controllers/auth';
import { validateAuth } from '../middlewares/validation';

const router = express.Router();

router.route('/register').post(validateAuth, register);
router.route('/login').post(validateAuth, login);

export default router;
