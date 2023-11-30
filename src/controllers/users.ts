import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { deleteUserById } from '../services/user';

export const deleteUser = async (req: Request, res: Response) => {
  const { user } = req;
  await deleteUserById({ userId: user!.userId });

  res.status(StatusCodes.NO_CONTENT).send();
};
