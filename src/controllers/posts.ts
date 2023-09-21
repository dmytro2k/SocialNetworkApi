import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaProvider } from '../dataProviders/prisma';

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;

  const post = await PrismaProvider.getInstance().post.findUnique({ where: { id } });

  res.status(StatusCodes.OK).json({ post });
};

export const getUserPosts = async (req: Request, res: Response) => {
  const { user } = req;

  const posts = await PrismaProvider.getInstance().post.findMany({ where: { userId: user!.id } });

  res.status(StatusCodes.OK).json({ posts });
};

export const createPost = async (req: Request, res: Response) => {
  const { user } = req;
  const { title, content } = req.body;

  const post = await PrismaProvider.getInstance().post.create({ data: { title, content, userId: user!.id } });

  res.status(StatusCodes.CREATED).json({ post });
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const post = await PrismaProvider.getInstance().post.update({ where: { id }, data: { title, content } });

  res.status(StatusCodes.OK).json({ post });
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  await PrismaProvider.getInstance().post.delete({ where: { id } });

  res.status(StatusCodes.NO_CONTENT).send();
};
