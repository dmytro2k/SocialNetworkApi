import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { AuthRequestValidation, authBody } from './auth';
import {
  CreatePostRequestValidation,
  EditPostRequestValidation,
  DeletePostRequestValidation,
  CreatePostBody,
  EditPostBody,
  DeletePostBody,
  GetPostsRequestValidation,
  GetPostsParams,
} from './post';
import {
  GetProfileRequestValidation,
  GetProfilesRequesValidation,
  EditProfileRequestValidation,
  GetProfilesBody,
  EditProfileBody,
  GetProfileParams,
} from './profile';
import { GetImageRequestValidation, GetImageParams } from './image';
import { FollowerRequestValidation, FollowerParams } from './follower';
import { LikeRequestValidation, LikeParams } from './like';
import {
  CreateCommentRequestValidation,
  EditCommentRequestValidation,
  DeleteCommentRequestValidation,
  GetCommentsRequestValidation,
  CreateCommentBody,
  EditCommentBody,
  DeleteCommentBody,
  GetCommentsParams,
} from './comment';

interface TypedRequest<BodyType, ParamsType extends ParamsDictionary, QueryType extends ParsedQs> extends Request {
  body: BodyType;
  params: ParamsType;
  query: QueryType;
}

export {
  AuthRequestValidation,
  authBody,
  CreatePostRequestValidation,
  EditPostRequestValidation,
  DeletePostRequestValidation,
  CreatePostBody,
  EditPostBody,
  DeletePostBody,
  GetPostsRequestValidation,
  GetPostsParams,
  GetProfileRequestValidation,
  GetProfilesRequesValidation,
  EditProfileRequestValidation,
  GetProfilesBody,
  EditProfileBody,
  GetProfileParams,
  GetImageRequestValidation,
  GetImageParams,
  FollowerRequestValidation,
  FollowerParams,
  TypedRequest,
  LikeRequestValidation,
  LikeParams,
  CreateCommentRequestValidation,
  EditCommentRequestValidation,
  DeleteCommentRequestValidation,
  GetCommentsRequestValidation,
  CreateCommentBody,
  EditCommentBody,
  DeleteCommentBody,
  GetCommentsParams,
};
