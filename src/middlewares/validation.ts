import { type Request, type Response, type NextFunction } from 'express';
import typia, { tags } from "typia";

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

export const validateMinimalPost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<MinimalPostRequestValidation>(req)
  next();
}

export const validateGetPosts = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetPostsRequestValidation>(req)
  next();
}

export type ValidatedRegisterRequest = RegisterRequestValidation & Request<unknown, unknown, unknown, unknown>
export type ValidatedLoginRequest = LoginRequestValidation & Request<unknown, unknown, unknown, unknown>
export type ValidatedCreatePostRequest = CreatePostRequestValidation & Request<unknown, unknown, unknown, unknown>
export type ValidatedUpdatePostRequest = UpdatePostRequestValidation & Request<unknown, unknown, unknown, unknown>
export type ValidatedMinimalPostRequest = MinimalPostRequestValidation & Request<unknown, unknown, unknown, unknown>
export type ValidatedGetPostsRequest = GetPostsRequestValidation & Request<unknown, unknown, unknown, unknown>

interface RegisterRequestValidation {
  body: {
    name: string
    email: string & tags.Format<"email">
    password: string
  }
}

interface LoginRequestValidation {
  body: {
    email: string & tags.Format<'email'>
    password: string
  }
}

interface CreatePostRequestValidation {
  body: {
    title: string
    content: string
  }
}

interface UpdatePostRequestValidation {
  body: {
    title: string
    content: string
  }
  params: {
    id: string & tags.Format<'uuid'>
  }
}

interface MinimalPostRequestValidation {
  params: {
    id: string & tags.Format<'uuid'>
  }
}

interface GetPostsRequestValidation {
  query: {
    userId?: string & tags.Format<'uuid'>
  }
}





