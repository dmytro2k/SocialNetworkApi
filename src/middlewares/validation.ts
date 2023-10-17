import { type Request, type Response, type NextFunction } from 'express';
import typia from 'typia';
import {
  RegisterRequestValidation,
  LoginRequestValidation,
  CreatePostRequestValidation,
  PatchPostRequestValidation,
  DeletePostRequestValidation,
  GetUserWithPostsRequestValidation,
  PatchProfileRequestValidation,
} from '../utils/validationIntefaces';
import { BadRequestError } from '../errors';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<RegisterRequestValidation>(req);
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<LoginRequestValidation>(req);
  next();
};

export const validateCreatePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<CreatePostRequestValidation>(req);
  next();
};

export const validatePatchPost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<PatchPostRequestValidation>(req);
  next();
};

export const validateDeletePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<DeletePostRequestValidation>(req);
  next();
};

export const validateGetUserWithPosts = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetUserWithPostsRequestValidation>(req);
  next();
};

export const validatePatchProfile = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<PatchProfileRequestValidation>(req);
  next();
};

export const validateImageFile = (file: Express.Multer.File | undefined, cb: Function): void => {
  if (file) {
    const filetypes = /jpeg|jpg|png|gif/;

    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new BadRequestError('Images Only!'));
    }
  }
};
