import { tags } from 'typia';
import { ParamsDictionary } from 'express-serve-static-core';

export interface CreateCommentRequestValidation {
  body: CreateCommentBody;
}

export interface CreateCommentBody {
  postId: string & tags.Format<'uuid'>;
  commentContent: string;
}

export interface EditCommentRequestValidation {
  body: EditCommentBody;
}

export interface EditCommentBody {
  commentId: string & tags.Format<'uuid'>;
  commentContent: string;
}

export interface DeleteCommentRequestValidation {
  body: DeleteCommentBody;
}

export interface DeleteCommentBody {
  commentId: string & tags.Format<'uuid'>;
}

export interface GetCommentsRequestValidation {
  params: GetCommentsParams;
}

export interface GetCommentsParams extends ParamsDictionary {
  postId: string & tags.Format<'uuid'>;
}
