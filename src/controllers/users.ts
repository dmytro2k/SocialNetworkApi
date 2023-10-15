import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllUserPosts } from '../services/post';
import { getUserWIthPosts } from '../services/user';
import { TypedRequest, GetUserWithPostsParams } from '../utils/validationIntefaces';

export const getMeWithPosts = async (req: Request, res: Response) => {
  const { user } = req
  const posts = await getAllUserPosts(user!.id)

  res.status(StatusCodes.OK).send({ user: { name: user!.name }, posts })
};

export const getUserWithPosts = async (req: TypedRequest<{}, GetUserWithPostsParams, {}>, res: Response) => {
  const id = req.params.id
  const userWithPosts = await getUserWIthPosts(id)

  res.status(StatusCodes.OK).send(userWithPosts)
};