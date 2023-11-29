import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface GetAllMessagesRequestValidation {
  params: GetAllMessagesParams;
}

export interface GetAllMessagesParams extends ParamsDictionary {
  chatRoomId: string & tags.Format<'uuid'>;
}
