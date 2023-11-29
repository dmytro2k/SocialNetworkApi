import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createNewComment, dropComment, getAllComments, updateComment } from '../services/comment';
import { CreateCommentBody, DeleteCommentBody, EditCommentBody, GetCommentsParams, TypedRequest } from '../interfaces';

export const createComment = async (req: TypedRequest<CreateCommentBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { postId, commentContent } = req.body;

  const comment = await createNewComment({ userId: user!.userId, postId, commentContent });

  res.status(StatusCodes.CREATED).json(comment);
};

export const editComment = async (req: TypedRequest<EditCommentBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { commentId, commentContent } = req.body;

  const comment = await updateComment({ userId: user!.userId, commentId, commentContent });

  res.status(StatusCodes.OK).json(comment);
};

export const deleteComment = async (req: TypedRequest<DeleteCommentBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { commentId } = req.body;

  await dropComment({ userId: user!.userId, commentId });

  res.status(StatusCodes.NO_CONTENT).send();
};

export const getComments = async (req: TypedRequest<{}, GetCommentsParams, {}>, res: Response) => {
  const { postId } = req.params;

  const comments = await getAllComments({ postId });

  res.status(StatusCodes.OK).json(comments);
};
