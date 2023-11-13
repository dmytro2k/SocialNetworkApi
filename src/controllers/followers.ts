import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FollowerParams, TypedRequest } from '../utils/validationIntefaces/';
import { createNewFollower, deleteFollowerByPK } from '../services/follower';

export const createFollower = async (req: TypedRequest<{}, FollowerParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;

  await createNewFollower({ userId, followerUserId: user!.userId });

  res.status(StatusCodes.OK).send();
};

export const deleteFollower = async (req: TypedRequest<{}, FollowerParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;

  await deleteFollowerByPK({ userId, followerUserId: user!.userId });

  res.status(StatusCodes.OK).send();
};
