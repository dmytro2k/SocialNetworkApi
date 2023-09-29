import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError, BadRequestError } from '../errors';
import { posts } from '../database/Post/schema';
import { ValidatedCreatePostRequest, ValidatedUpdatePostRequest, ValidatedGetPostsRequest, ValidatedMinimalPostRequest } from '../middlewares/validation';

export const getPost = async (req: ValidatedMinimalPostRequest, res: Response) => {
  const id = req.params.id;
  const db = DrizzleProvider.getInstance()
  const post = (await db.select().from(posts).where(eq(posts.id, id)))[0]
  
  if(!post){
    throw new NotFoundError('Not found such a post')
  }

  res.status(StatusCodes.OK).json({ post });
};

export const getUserPosts = async (req: ValidatedGetPostsRequest, res: Response) => {
  const { user } = req;
  let userId = req.query.userId as string|undefined

  if(!userId){
    userId = user!.id
  }

  const db = DrizzleProvider.getInstance()
  const userPosts = await db.select().from(posts).where(eq(posts.userId, userId))

  res.status(StatusCodes.OK).json({ userPosts });
};

export const createPost = async (req: ValidatedCreatePostRequest, res: Response) => {
  const { user } = req;
  const { title, content } = req.body;

  if(title === '' || content === ''){
    throw new BadRequestError('title and content should not be empty')
  }

  const db = DrizzleProvider.getInstance()
  const post = await db.insert(posts).values({ title, content, userId: user!.id }).returning()

  res.status(StatusCodes.CREATED).json({ post });
};

export const updatePost = async (req: ValidatedUpdatePostRequest, res: Response) => {
  const id = req.params.id;
  const { title, content } = req.body;

  if(title === '' || content === ''){
    throw new BadRequestError('title and content should not be empty')
  }

  const db = DrizzleProvider.getInstance()
  let post = (await db.select().from(posts).where(eq(posts.id, id)))[0]
  
  if(!post){
    throw new NotFoundError('Not found such a post')
  }

  post = (await db.update(posts).set({ title, content }).where(eq(posts.id, id)).returning())[0]

  res.status(StatusCodes.OK).json({ post });
};

export const deletePost = async (req: ValidatedMinimalPostRequest, res: Response) => {
  const id = req.params.id;
  const db = DrizzleProvider.getInstance()
  const post = (await db.select().from(posts).where(eq(posts.id, id)))[0]
  
  if(!post){
    throw new NotFoundError('Not found such a post')
  }
  
  await db.delete(posts).where(eq(posts.id, id))

  res.status(StatusCodes.NO_CONTENT).send();
};
