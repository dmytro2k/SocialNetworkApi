import { NextFunction, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest, authBody } from '../utils/validationInterfaces';
import { userRegister, userLogin } from '../services/auth';

export const register = async (req: TypedRequest<authBody, {}, {}>, res: Response, next: NextFunction) => {
  const { userEmail, userPassword } = req.body;
  const { token, userId } = await userRegister({ userEmail, userPassword });

  res.status(StatusCodes.CREATED).json({ token, userId });
};

export const login = async (req: TypedRequest<authBody, {}, {}>, res: Response, next: NextFunction) => {
  const { userEmail, userPassword } = req.body;
  const { token, userId } = await userLogin({ userEmail, userPassword });

  res.status(StatusCodes.OK).json({ token, userId });
};
