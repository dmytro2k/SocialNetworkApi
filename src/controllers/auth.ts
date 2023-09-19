import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PrismaClient } from '@prisma/client'
import { BadRequestError, NotFoundError } from '../errors'
import {
  validate,
  hashPassword,
  comparePasswords,
  createJWT,
} from '../middlewares/auth'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
  validate(req, res)

  let { email, password } = req.body

  const userExists = (await prisma.user.findUnique({ where: { email } }))
    ? false
    : true

  if (userExists) {
    throw new NotFoundError(`User with email: '${email}' does not exists`)
  }

  const user = (await prisma.user.findUnique({ where: { email } }))!
  await comparePasswords(password, user.password)

  const jwt = createJWT(user.id, user.name)
  res.status(StatusCodes.OK).json({ data: { user, jwt } })
}

export const register = async (req: Request, res: Response) => {
  validate(req, res)

  let { name, email, password } = req.body
  password = await hashPassword(password)

  const userExists = (await prisma.user.findUnique({ where: { email } }))
    ? false
    : true

  if (!userExists) {
    throw new BadRequestError(`User with email: '${email}' already exists`)
  }

  const user = await prisma.user.create({ data: { name, email, password } })
  const jwt = createJWT(user.id, user.name)
  res.status(StatusCodes.CREATED).json({ data: { user, jwt } })
}
