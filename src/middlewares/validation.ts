import { type Request, type Response, type NextFunction } from 'express';
import typia, { tags } from "typia";
import { BadRequestError } from '../errors';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const results = typia.createValidate<registerValidation>()(req.body)

  if(!results.success){
    throw new BadRequestError('Register data validation failed');
  }

  next();
}

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const results = typia.createValidate<loginValidation>()(req.body)

  if(!results.success){
    throw new BadRequestError('Login data validation failed');
  }

  next();
}

export const validatePost = (req: Request, res: Response, next: NextFunction): void => {
  const results = typia.createValidate<postValidation>()(req.body)
  
  if(!results.success){
    throw new BadRequestError('Post data validation failed');
  }

  next();
}

export interface registerValidation {
  name: string
  email: string & tags.Format<"email">
  password: string
}

export interface loginValidation {
  email: string & tags.Format<'email'>
  password: string
}

export interface postValidation {
  title: string
  content: string
}