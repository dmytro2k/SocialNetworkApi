import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getImageById } from '../services/image';
import { GetImageParams, TypedRequest } from '../utils/validationInterfaces';
import path from 'path';

export const getImage = async (req: TypedRequest<{}, GetImageParams, {}>, res: Response) => {
  const { imageId } = req.params;
  const image = await getImageById({ imageId });

  const root = '/Users/dima/Desktop/study/newNode/SNbackend/images';
  const originalImagePath = path.join(root, image.imageType, 'originals', `${image.imageName}${image.imageExtension}`);

  res.status(StatusCodes.OK).sendFile(originalImagePath);
};

export const getCompressedImage = async (req: TypedRequest<{}, GetImageParams, {}>, res: Response) => {
  const { imageId } = req.params;
  const image = await getImageById({ imageId });

  const root = '/Users/dima/Desktop/study/newNode/SNbackend/images';
  const compressedImagePath = path.join(root, image.imageType, 'compressed', `${image.imageName}${image.imageExtension}`);

  res.status(StatusCodes.OK).sendFile(compressedImagePath);
};

export const getDefaultImage = async (req: Request, res: Response) => {
  const root = '/Users/dima/Desktop/study/newNode/SNbackend/images';
  const originalImagePath = path.join(root, 'avatar', 'originals', 'default.jpg');

  res.status(StatusCodes.OK).sendFile(originalImagePath);
};

export const getCompressedDefaultImage = async (req: Request, res: Response) => {
  const root = '/Users/dima/Desktop/study/newNode/SNbackend/images';
  const compressedImagePath = path.join(root, 'avatar', 'compressed', 'default.jpg');

  res.status(StatusCodes.OK).sendFile(compressedImagePath);
};
