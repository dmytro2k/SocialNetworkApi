import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest, CreatePostBody, PatchPostBody, DeletePostBody } from '../utils/validationIntefaces';
import { createNewPost, deletePostById, updatePost } from '../services/post';

export const createPost = async (req: TypedRequest<CreatePostBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { title, content } = req.body;

  const post = await createNewPost({ title, content, user })

  res.status(StatusCodes.CREATED).json({ post });
};

export const patchPost = async (req: TypedRequest<PatchPostBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { id, title, content } = req.body
  const possibleUpdates = { title, content }

  const post = await updatePost({id, possibleUpdates, user})

  res.status(StatusCodes.OK).json({ post });
};

export const deletePost = async (req: TypedRequest<DeletePostBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { id } = req.body;

  await deletePostById( { id, user } )

  res.status(StatusCodes.NO_CONTENT).send();
};
