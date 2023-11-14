import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllProfiles, getFollowedByUserProfiles, getProfileByUserId, updateProfile } from '../services/profile';
import { TypedRequest, GetProfileParams, EditProfileBody, GetProfilesBody } from '../utils/validationInterfaces';
import { createImage } from '../services/image';
import { compressImageFile } from '../utils/image';

export const getProfile = async (req: TypedRequest<{}, GetProfileParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;
  const profile = await getProfileByUserId({ userId, followerUserId: user!.userId });

  res.status(StatusCodes.OK).json(profile);
};

export const editProfile = async (req: TypedRequest<EditProfileBody, {}, {}>, res: Response) => {
  const { user, file } = req;
  const { profileName, profileStatus } = req.body;
  const imageId = file ? await createImage({ file, imageType: 'avatar' }) : undefined;

  const possibleUpdates = { profileName, profileStatus, imageId };

  const profile = await updateProfile({ possibleUpdates, user });

  res.status(StatusCodes.OK).json(profile);

  if (file) {
    res.on('finish', async () => compressImageFile('avatar', file.filename, 40, file.mimetype));
  }
};

export const getProfiles = async (req: TypedRequest<GetProfilesBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { searchString } = req.body;

  const profiles = await getAllProfiles({ followerUserId: user!.userId, searchString });

  res.status(StatusCodes.OK).json(profiles);
};

export const getFollowedProfiles = async (req: TypedRequest<GetProfilesBody, {}, {}>, res: Response) => {
  const { user } = req;
  const { searchString } = req.body;

  const profiles = await getFollowedByUserProfiles({ followerUserId: user!.userId, searchString });

  res.status(StatusCodes.OK).json(profiles);
};
