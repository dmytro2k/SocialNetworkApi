import { type Request, type Response, type NextFunction } from 'express';
import typia from "typia";
import {
  RegisterRequestValidation,
  LoginRequestValidation,
  CreatePostRequestValidation,
  UpdatePostRequestValidation,
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
  typia.assert<UpdatePostRequestValidation>(req)
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

export type ValidatedRegisterRequest = RegisterRequestValidation & Request<unknown, unknown, unknown>
export type ValidatedLoginRequest = LoginRequestValidation & Request<unknown, unknown, unknown>
export type ValidatedCreatePostRequest = CreatePostRequestValidation & Request<unknown, unknown, unknown>
export type ValidatedUpdatePostRequest = UpdatePostRequestValidation & Request<unknown, unknown, unknown>
export type ValidatedDeletePostRequest = DeletePostRequestValidation & Request<unknown, unknown, unknown>
export type ValidatedGetUserWithPostsRequest = GetUserWithPostsRequestValidation & Request