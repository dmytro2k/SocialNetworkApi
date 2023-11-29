import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';
import { getUserById } from '../services/user';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Authentication');
  }

  const token = authHeader.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  const user = await getUserById({ userId: payload.id });

  if (!user) {
    throw new UnauthenticatedError('User cannot be found');
  }

  req.user = user;
  next();
};
