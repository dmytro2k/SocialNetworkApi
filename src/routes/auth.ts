import express from 'express';
import { login, register } from '../controllers/auth';
import { validateLogin, validateRegister } from '../middlewares/validation';

const router = express.Router();

router.route('/register').post(validateRegister, register);
router.route('/login').post(validateLogin, login);

export default router;
