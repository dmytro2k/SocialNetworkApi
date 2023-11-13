import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypedRequest, CreatePostBody, PatchPostBody, DeletePostBody, GetPostsParams } from '../utils/validationIntefaces/';
import { createNewPost, deletePostById, getAllUserPosts, updatePost } from '../services/post';
import { createImage } from '../services/image';
import { compressImageFile } from '../utils/image';

export const createPost = async (req: TypedRequest<CreatePostBody, {}, {}>, res: Response) => {
  const { user, file } = req;
  const { postContent } = req.body;

  const imageId = file ? await createImage({ file }) : undefined;
  const post = await createNewPost({ postContent, user, imageId });

  res.status(StatusCodes.CREATED).json(post);

  if (file) {
    res.on('finish', async () => compressImageFile('post', file.filename, 20, file.mimetype));
  }
};

export const patchPost = async (req: TypedRequest<PatchPostBody, {}, {}>, res: Response) => {
  const { user, file } = req;
  const { postId, postContent } = req.body;
  const imageId = file ? await createImage({ file }) : undefined;

  const possibleUpdates = { postContent, imageId };

  const post = await updatePost({ postId, possibleUpdates, user });

  res.status(StatusCodes.OK).json(post);

  if (file) {
    res.on('finish', async () => compressImageFile('post', file.filename, 20, file.mimetype));
  }
};

export const deletePost = async (req: TypedRequest<DeletePostBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { postId } = req.body;

  await deletePostById({ postId, user });

  res.status(StatusCodes.NO_CONTENT).send();
};

export const getPosts = async (req: TypedRequest<{}, GetPostsParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;

  const posts = await getAllUserPosts({ userId, currentUserId: user!.userId });
  res.status(StatusCodes.OK).json(posts);
};
