import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'
import { BadRequestError } from '../errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(13)
  return await bcrypt.hash(password, salt)
}

export const createJWT = (id: string, name: string) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

export const comparePasswords = async (
  candidatePassword: string,
  password: string
): Promise<void|Error> => {
  const isMatch = await bcrypt.compare(candidatePassword, password)

  if(!isMatch){
    throw new BadRequestError('Incorrect password')
  }
}

export const validate = (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new BadRequestError('Bad request data')
  }
}
