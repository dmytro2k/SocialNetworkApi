import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUserWIthPosts } from '../services/user';
import { TypedRequest, GetUserWithPostsParams, PatchProfileBody } from '../utils/validationIntefaces';
import { createImage } from '../services/image';
import { updateProfile } from '../services/profile';
import { compressImageFile } from '../utils/image';

export const getMeWithPosts = async (req: Request, res: Response) => {
  const { user } = req;
  const userWithPosts = await getUserWIthPosts(user!.id);

  res.status(StatusCodes.OK).send(userWithPosts);
};

export const getUserWithPosts = async (req: TypedRequest<{}, GetUserWithPostsParams, {}>, res: Response) => {
  const id = req.params.id;
  const userWithPosts = await getUserWIthPosts(id);

  res.status(StatusCodes.OK).send(userWithPosts);
};

export const patchProfile = async (req: TypedRequest<PatchProfileBody, {}, {}>, res: Response) => {
  const { user, file } = req;
  const { name, status } = req.body;
  const imageId = file ? await createImage(file, 'avatar') : undefined;

  const possibleUpdates = { name, status, imageId };

  const profile = await updateProfile(possibleUpdates, user);

  res.status(StatusCodes.OK).json({ profile });

  if (file) {
    res.on('finish', async () => compressImageFile('avatar', file.filename, 40, file.mimetype));
  }
};
