import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface LikeRequestValidation {
  params: LikeParams;
}

export interface LikeParams extends ParamsDictionary {
  postId: string & tags.Format<'uuid'>;
}
