import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface CreatePostRequestValidation {
  body: CreatePostBody;
}

export interface CreatePostBody {
  postContent: string;
}

export interface EditPostRequestValidation {
  body: EditPostBody;
}

export interface EditPostBody {
  postId: string & tags.Format<'uuid'>;
  postContent: string;
}

export interface DeletePostRequestValidation {
  body: DeletePostBody;
}

export interface DeletePostBody {
  postId: string & tags.Format<'uuid'>;
}

export interface GetPostsRequestValidation {
  params: GetPostsParams;
}

export interface GetPostsParams extends ParamsDictionary {
  userId: string & tags.Format<'uuid'>;
}
