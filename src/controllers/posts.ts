import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest, CreatePostBody, PatchPostBody, DeletePostBody } from '../utils/validationIntefaces';
import { createNewPost, deletePostById, updatePost } from '../services/post';
import { createImage } from '../services/image';
import { compressImageFile } from '../utils/image';

export const createPost = async (req: TypedRequest<CreatePostBody, {}, {}>, res: Response) => {
  const { user, file } = req;
  const { title, content } = req.body;

  const imageId = file ? await createImage(file) : null;
  const post = await createNewPost({ title, content, user, imageId });

  res.status(StatusCodes.CREATED).json({ post });

  if (file) {
    res.on('finish', async () => compressImageFile('post', file.filename, 20, file.mimetype));
  }
};

export const patchPost = async (req: TypedRequest<PatchPostBody, {}, {}>, res: Response) => {
  const { user, file } = req;
  const { id, title, content } = req.body;
  const imageId = file ? await createImage(file) : null;

  const possibleUpdates = { title, content, imageId };

  const post = await updatePost({ id, possibleUpdates, user });

  res.status(StatusCodes.OK).json({ post });

  if (file) {
    res.on('finish', async () => compressImageFile('post', file.filename, 20, file.mimetype));
  }
};

export const deletePost = async (req: TypedRequest<DeletePostBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { id } = req.body;

  await deletePostById({ id, user });

  res.status(StatusCodes.NO_CONTENT).send();
};
