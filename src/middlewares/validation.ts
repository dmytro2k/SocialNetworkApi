import { type Request, type Response, type NextFunction } from 'express';
import typia from "typia";
import {
  RegisterRequestValidation,
  LoginRequestValidation,
  CreatePostRequestValidation,
  PatchPostRequestValidation,
  DeletePostRequestValidation,
  GetUserWithPostsRequestValidation
} from '../utils/validationIntefaces'

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<RegisterRequestValidation>(req)
  next();
}

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<LoginRequestValidation>(req)
  next();
}

export const validateCreatePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<CreatePostRequestValidation>(req)
  next();
}

export const validateUpdatePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<PatchPostRequestValidation>(req)
  next();
}

export const validateDeletePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<DeletePostRequestValidation>(req)
  next();
}

export const validateGetUserWithPosts = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetUserWithPostsRequestValidation>(req)
  next();
}
