import express from 'express'
import { login, register } from '../controllers/auth'
import { body } from 'express-validator'

const router = express.Router()

const loginVal= [
  body('email').isEmail(),
  body('password').notEmpty().isString(),
]

const registerVal = [
  body('name').notEmpty().isString(),
  ...loginVal
]

router.route('/register').post(registerVal, register)
router.route('/login').post(loginVal, login)

export default router
