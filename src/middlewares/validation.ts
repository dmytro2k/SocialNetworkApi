import { type Request, type Response, type NextFunction } from 'express';
import typia from 'typia';
import {
  RegisterRequestValidation,
  LoginRequestValidation,
  CreatePostRequestValidation,
  PatchPostRequestValidation,
  DeletePostRequestValidation,
  UpdateMyProfileRequestValidation,
  GetProfileRequestValidation,
  GetImageRequestValidation,
  CreateFollowerRequestValidation,
  DeleteFollowerRequestValidation,
  GetProfilesRequesValidation,
  GetPostsRequestValidation,
} from '../utils/validationIntefaces/';
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

export const validateGetPosts = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetPostsRequestValidation>(req);
  next();
};

export const validateUpdateMyProfile = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<UpdateMyProfileRequestValidation>(req);
  next();
};

export const validateGetProfile = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetProfileRequestValidation>(req);
  next();
};

export const validateGetProfiles = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetProfilesRequesValidation>(req);
  next();
};

export const validateGetImage = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetImageRequestValidation>(req);
  next();
};

export const validateCreateFollower = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<CreateFollowerRequestValidation>(req);
  next();
};

export const validateDeleteFollower = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<DeleteFollowerRequestValidation>(req);
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
