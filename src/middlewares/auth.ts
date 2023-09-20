import { BadRequestError, NotFoundError } from '../errors'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(13)
  return await bcrypt.hash(password, salt)
}

export const comparePasswords = async (
  candidatePassword: string,
  password: string
): Promise<void> => {
  const isMatch = await bcrypt.compare(candidatePassword, password)

  if(!isMatch){
    throw new BadRequestError('Incorrect password')
  }
}

export const checkUserExistence = async (expectation: boolean, email: string): Promise<void> => {
  const userExists = (await prisma.user.findUnique({ where: { email } }))
  ? true
  : false

  if (!userExists && expectation) {
    throw new NotFoundError(`User with email: '${email}' does not exists`)
  }

  if (userExists && !expectation) {
    throw new BadRequestError(`User with email: '${email}' already exists`)
  }
}
