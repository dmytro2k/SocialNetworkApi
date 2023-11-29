import { type Request, type Response, type NextFunction } from 'express';
import typia from 'typia';
import {
  AuthRequestValidation,
  CreatePostRequestValidation,
  EditPostRequestValidation,
  DeletePostRequestValidation,
  EditProfileRequestValidation,
  GetProfileRequestValidation,
  GetImageRequestValidation,
  FollowerRequestValidation,
  GetProfilesRequesValidation,
  GetPostsRequestValidation,
  LikeRequestValidation,
  CreateCommentRequestValidation,
  EditCommentRequestValidation,
  DeleteCommentRequestValidation,
  GetCommentsRequestValidation,
  ChatRoomRequestValidation,
  GetAllMessagesRequestValidation,
} from '../interfaces';
import { BadRequestError } from '../errors';

const validateAuth = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<AuthRequestValidation>(req);
  next();
};

const validateCreatePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<CreatePostRequestValidation>(req);
  next();
};

const validateEditPost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<EditPostRequestValidation>(req);
  next();
};

const validateDeletePost = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<DeletePostRequestValidation>(req);
  next();
};

const validateGetPosts = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetPostsRequestValidation>(req);
  next();
};

const validateEditProfile = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<EditProfileRequestValidation>(req);
  next();
};

const validateGetProfile = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetProfileRequestValidation>(req);
  next();
};

const validateGetProfiles = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetProfilesRequesValidation>(req);
  next();
};

const validateGetImage = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetImageRequestValidation>(req);
  next();
};

const validateFollower = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<FollowerRequestValidation>(req);
  next();
};

const validateLike = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<LikeRequestValidation>(req);
  next();
};

const validateCreateComment = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<CreateCommentRequestValidation>(req);
  next();
};

const validateEditComment = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<EditCommentRequestValidation>(req);
  next();
};

const validateDeleteComment = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<DeleteCommentRequestValidation>(req);
  next();
};

const validateGetComments = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetCommentsRequestValidation>(req);
  next();
};

const validateGetChatRoom = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<ChatRoomRequestValidation>(req);
  next();
};

const validateGetAllMessages = (req: Request, res: Response, next: NextFunction): void => {
  typia.assert<GetAllMessagesRequestValidation>(req);
  next();
};

const validateImageFile = (file: Express.Multer.File | undefined, cb: Function): void => {
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

export {
  validateAuth,
  validateCreatePost,
  validateEditPost,
  validateDeletePost,
  validateGetPosts,
  validateEditProfile,
  validateGetProfile,
  validateGetProfiles,
  validateGetImage,
  validateFollower,
  validateLike,
  validateCreateComment,
  validateEditComment,
  validateDeleteComment,
  validateGetComments,
  validateImageFile,
  validateGetChatRoom,
  validateGetAllMessages,
};
