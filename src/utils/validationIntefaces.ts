import { tags } from 'typia';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface TypedRequest<BodyType, ParamsType extends ParamsDictionary, QueryType extends ParsedQs> extends Request {
  body: BodyType;
  params: ParamsType;
  query: QueryType;
}

export interface RegisterRequestValidation {
  body: RegisterBody;
}

export interface RegisterBody {
  name: string;
  email: string & tags.Format<'email'>;
  password: string;
}

export interface LoginRequestValidation {
  body: LoginrBody;
}

export interface LoginrBody {
  email: string & tags.Format<'email'>;
  password: string;
}

export interface CreatePostRequestValidation {
  body: CreatePostBody;
}

export interface CreatePostBody {
  title: string;
  content: string;
}

export interface PatchPostRequestValidation {
  body: PatchPostBody;
}

export interface PatchPostBody {
  id: string & tags.Format<'uuid'>;
  title?: string;
  content?: string;
}

export interface DeletePostRequestValidation {
  body: DeletePostBody;
}

export interface DeletePostBody {
  id: string & tags.Format<'uuid'>;
}

export interface GetUserWithPostsRequestValidation {
  params: GetUserWithPostsParams;
}

export interface GetUserWithPostsParams extends ParamsDictionary {
  id: string & tags.Format<'uuid'>;
}
