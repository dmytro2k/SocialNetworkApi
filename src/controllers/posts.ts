import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError } from '../errors';
import { postValidation } from '../middlewares/validation';
import { posts } from '../database/Post/schema';

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = DrizzleProvider.getInstance()
  const post = (await db.select().from(posts).where(eq(posts.id, id)))[0]
  
  if(!post){
    throw new NotFoundError('Not found any posts')
  }

  res.status(StatusCodes.OK).json({ post });
};

export const getUserPosts = async (req: Request, res: Response) => {
  const { user } = req;
  let userId = req.query.userId as string|undefined

  if(!userId){
    userId = user!.id
  }

  const db = DrizzleProvider.getInstance()
  const userPosts = await db.select().from(posts).where(eq(posts.userId, userId))

  res.status(StatusCodes.OK).json({ userPosts });
};

export const createPost = async (req: Request, res: Response) => {
  const { user } = req;
  const { title, content } = req.body as postValidation;

  const db = DrizzleProvider.getInstance()
  const post = await db.insert(posts).values({ title, content, userId: user!.id }).returning()

  res.status(StatusCodes.CREATED).json({ post });
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content } = req.body as postValidation;

  const db = DrizzleProvider.getInstance()
  let post = (await db.select().from(posts).where(eq(posts.id, id)))[0]
  
  if(!post){
    throw new NotFoundError('Not found any posts')
  }

  post = (await db.update(posts).set({ title, content }).where(eq(posts.id, id)).returning())[0]

  res.status(StatusCodes.OK).json({ post });
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = DrizzleProvider.getInstance()
  const post = (await db.select().from(posts).where(eq(posts.id, id)))[0]
  
  if(!post){
    throw new NotFoundError('Not found any posts')
  }
  
  await db.delete(posts).where(eq(posts.id, id))

  res.status(StatusCodes.NO_CONTENT).send();
};
