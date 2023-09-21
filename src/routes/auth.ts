import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth';
import { validate } from '../middlewares/validation';

const router = express.Router();

const loginVal = [body('email').isEmail(), body('password').notEmpty().isString()];

const registerVal = [body('name').notEmpty().isString(), ...loginVal];

router.route('/register').post(registerVal, validate, register);
router.route('/login').post(loginVal, validate, login);

export default router;
