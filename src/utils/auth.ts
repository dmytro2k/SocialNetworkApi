import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BadRequestError, UnauthenticatedError } from '../errors';
import { getUserById } from '../services/user';

type VerifyTokenProps = {
  token: string;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(13);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (candidatePassword: string, password: string): Promise<void> => {
  const isMatch = await bcrypt.compare(candidatePassword, password);

  if (!isMatch) {
    throw new BadRequestError('Incorrect password');
  }
};

export const createJWT = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export const verifyToken = async ({ token }: VerifyTokenProps) => {
  if (!token) {
    throw new UnauthenticatedError('Invalid Authentication');
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  const user = await getUserById({ userId: payload.id });

  if (!user) {
    throw new UnauthenticatedError('User cannot be found');
  }

  return user;
};
