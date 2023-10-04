import { NextFunction, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest, RegisterBody, LoginrBody } from '../utils/validationIntefaces';
import { userRegister, userLogin } from '../services/user';

export const register = async (req: TypedRequest<RegisterBody, {}, {}>, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const token = await userRegister({ name, email, password })

  res.status(StatusCodes.CREATED).json({ token });
};

export const login = async (req: TypedRequest<LoginrBody, {}, {}>, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const token = await userLogin({ email, password })

  res.status(StatusCodes.OK).json({ token });
};