import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface GetImageRequestValidation {
  params: GetImageParams;
}

export interface GetImageParams extends ParamsDictionary {
  imageId: string & tags.Format<'uuid'>;
}
