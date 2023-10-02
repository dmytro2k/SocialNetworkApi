import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllUserPosts } from '../services/post';
import { getUserById } from '../services/user';
import { ValidatedGetUserWithPostsRequest } from '../middlewares/validation';

export const getMeWithPosts = async (req: Request, res: Response) => {
  const { user } = req
  const posts = await getAllUserPosts(user!.id)

  res.status(StatusCodes.OK).send({ user: { name: user!.name }, posts })
};

export const getUserWithPosts = async (req: ValidatedGetUserWithPostsRequest, res: Response) => {
  const id = req.params.id
  const { name } = await getUserById(id)
  const posts = await getAllUserPosts(id)

  res.status(StatusCodes.OK).send({ user: { name }, posts })
};