import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FollowerParams, TypedRequest } from '../interfaces';
import { createNewFollower, dropFollower } from '../services/follower';

export const createFollower = async (req: TypedRequest<{}, FollowerParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;

  await createNewFollower({ userId, followerUserId: user!.userId });

  res.status(StatusCodes.CREATED).send();
};

export const deleteFollower = async (req: TypedRequest<{}, FollowerParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;

  await dropFollower({ userId, followerUserId: user!.userId });

  res.status(StatusCodes.NO_CONTENT).send();
};
