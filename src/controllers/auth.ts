import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaProvider } from '../dataProviders/prisma';
import { BadRequestError, NotFoundError } from '../errors';
import { createJWT } from '../utils/auth';
import { hashPassword, comparePasswords } from '../utils/auth';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await PrismaProvider.getInstance().user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      password: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User cannot be found');
  }

  await comparePasswords(password, user.password);

  const jwt = createJWT(user.id);

  res.status(StatusCodes.OK).json({ data: { user: { id: user.id, name: user.name }, jwt } });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existedUser = await PrismaProvider.getInstance().user.count({
    where: {
      email,
    },
  });

  if (existedUser) {
    throw new BadRequestError('Email is already taken');
  }

  const hashedPassword = await hashPassword(password);

  const user = await PrismaProvider.getInstance().user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const jwt = createJWT(user.id);

  res.status(StatusCodes.CREATED).json({ data: { user: { id: user.id, name: user.name }, jwt } });
};
