import { NextFunction, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest, authBody } from '../utils/validationIntefaces';
import { userRegister, userLogin } from '../services/user';

export const register = async (req: TypedRequest<authBody, {}, {}>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const token = await userRegister(email, password);

  res.status(StatusCodes.CREATED).json({ token });
};

export const login = async (req: TypedRequest<authBody, {}, {}>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const token = await userLogin(email, password);

  res.status(StatusCodes.OK).json({ token });
};
