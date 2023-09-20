import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
// import { UnauthenticatedError } from '../errors'
// import { Request, Response, NextFunction } from 'express'

dotenv.config()

export const createJWT = (id: string, name: string): string => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

// export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new UnauthenticatedError('Invalid Authentication')
//   }

//   const token = authHeader.split(' ')[1]
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!);

//     next()
//   } catch (error) {
//     throw new UnauthenticatedError('Invalid Authentication')
//   }
// }