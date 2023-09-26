import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';
import { DrizzleProvider } from '../database/dataProvider';
import { users } from '../database/User/schema';
import { eq } from 'drizzle-orm';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Authentication');
  }

  const token = authHeader.split(' ')[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  const db = DrizzleProvider.getInstance()
  const user = (await db.select().from(users).where(eq(users.id, payload.id)))[0]

  if (!user) {
    throw new UnauthenticatedError('User cannot be found');
  }

  req.user = user;

  next();
};
