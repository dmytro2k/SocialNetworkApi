import { NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { BadRequestError, NotFoundError } from '../errors';
import { createJWT } from '../utils/auth';
import { hashPassword, comparePasswords } from '../utils/auth';
import { users } from '../database/User/schema';
import { ValidatedRegisterRequest, ValidatedLoginRequest } from '../middlewares/validation';

export const login = async (req: ValidatedLoginRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  
  const db = DrizzleProvider.getInstance()
  const user = (await db.select().from(users).where(eq(users.email, email)))[0]

  if (!user) {
    throw new NotFoundError('User cannot be found');
  }

  await comparePasswords(password, user.password);

  const token = createJWT(user.id);

  res.status(StatusCodes.OK).json({ user: { id: user.id, name: user.name }, token });
};

export const register = async (req: ValidatedRegisterRequest, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const db = DrizzleProvider.getInstance()
  const existedUser = (await db.select().from(users).where(eq(users.email, email)))[0]

  if (existedUser) {
    throw new BadRequestError('Email is already taken');
  }

  const hashedPassword = await hashPassword(password);

  const user = (await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning())[0]

  const token = createJWT(user.id);

  res.status(StatusCodes.CREATED).json({ user: { id: user.id, name: user.name }, token });
};
