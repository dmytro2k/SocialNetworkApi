import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RegisterRequestValidation, LoginRequestValidation, authBody } from './auth';
import {
  CreatePostRequestValidation,
  PatchPostRequestValidation,
  DeletePostRequestValidation,
  CreatePostBody,
  PatchPostBody,
  DeletePostBody,
  GetPostsRequestValidation,
  GetPostsParams,
} from './post';
import {
  GetProfileRequestValidation,
  GetProfilesRequesValidation,
  UpdateMyProfileRequestValidation,
  GetProfilesBody,
  UpdateMyProfileBody,
  GetProfileParams,
} from './profile';
import { GetImageRequestValidation, GetImageParams } from './image';
import { CreateFollowerRequestValidation, DeleteFollowerRequestValidation, FollowerParams } from './follower';

interface TypedRequest<BodyType, ParamsType extends ParamsDictionary, QueryType extends ParsedQs> extends Request {
  body: BodyType;
  params: ParamsType;
  query: QueryType;
}

export {
  RegisterRequestValidation,
  LoginRequestValidation,
  authBody,
  CreatePostRequestValidation,
  PatchPostRequestValidation,
  DeletePostRequestValidation,
  CreatePostBody,
  PatchPostBody,
  DeletePostBody,
  GetPostsRequestValidation,
  GetPostsParams,
  GetProfileRequestValidation,
  GetProfilesRequesValidation,
  UpdateMyProfileRequestValidation,
  GetProfilesBody,
  UpdateMyProfileBody,
  GetProfileParams,
  GetImageRequestValidation,
  GetImageParams,
  CreateFollowerRequestValidation,
  DeleteFollowerRequestValidation,
  FollowerParams,
  TypedRequest,
};
