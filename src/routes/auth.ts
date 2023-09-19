import express from 'express'
import { login, register } from '../controllers/auth'
import { body } from 'express-validator'

const router = express.Router()

const registerValidateReq = [
  body('name').notEmpty().isString(),
  body('email').isEmail(),
  body('password').notEmpty().isString(),
]

const loginValidateReq = [
  body('email').isEmail(),
  body('password').notEmpty().isString(),
]

router.route('/register').post(registerValidateReq, register)
router.route('/login').post(loginValidateReq, login)

export default router
