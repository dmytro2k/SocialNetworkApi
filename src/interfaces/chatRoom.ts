import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface ChatRoomRequestValidation {
  params: ChatRoomParams;
}

export interface ChatRoomParams extends ParamsDictionary {
  userId: string & tags.Format<'uuid'>;
}
