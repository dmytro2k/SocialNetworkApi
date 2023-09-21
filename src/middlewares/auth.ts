import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';
import { PrismaProvider } from '../dataProviders/prisma';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Authentication');
  }

  const token = authHeader.split(' ')[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  const user = await PrismaProvider.getInstance().user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    throw new UnauthenticatedError('User cannot be found');
  }

  req.user = user;

  next();
};
