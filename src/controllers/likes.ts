import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createNewLike, dropLike } from '../services/like';
import { LikeParams, TypedRequest } from '../utils/validationInterfaces';

export const createLike = async (req: TypedRequest<{}, LikeParams, {}>, res: Response) => {
  const { user } = req;
  const { postId } = req.params;

  await createNewLike({ userId: user!.userId, postId });

  res.status(StatusCodes.CREATED).send();
};

export const deleteLike = async (req: TypedRequest<{}, LikeParams, {}>, res: Response) => {
  const { user } = req;
  const { postId } = req.params;

  await dropLike({ userId: user!.userId, postId });

  res.status(StatusCodes.NO_CONTENT).send();
};
