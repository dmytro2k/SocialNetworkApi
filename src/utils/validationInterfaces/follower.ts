import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface FollowerRequestValidation {
  params: FollowerParams;
}

export interface FollowerParams extends ParamsDictionary {
  userId: string & tags.Format<'uuid'>;
}
