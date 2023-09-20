import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PrismaClient } from '@prisma/client'
import { validate } from '../middlewares/validation'
import { createJWT } from '../middlewares/authentication'
import {
  hashPassword,
  comparePasswords,
  checkUserExistence
} from '../middlewares/auth'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
  validate(req, res)

  let { email, password } = req.body

  await checkUserExistence(true, email)

  const user = (await prisma.user.findUnique({ where: { email } }))!
  await comparePasswords(password, user.password)

  const jwt = createJWT(user.id, user.name)
  res.status(StatusCodes.OK).json({ data: { user: { id: user.id, name: user.name }, jwt } })
}

export const register = async (req: Request, res: Response) => {
  validate(req, res)

  let { name, email, password } = req.body
  password = await hashPassword(password)

  await checkUserExistence(false, email)

  const user = await prisma.user.create({ data: { name, email, password } })
  const jwt = createJWT(user.id, user.name)
  res.status(StatusCodes.CREATED).json({ data: { user: { id: user.id, name: user.name }, jwt } })
}
