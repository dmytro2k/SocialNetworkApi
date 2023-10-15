import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const deleteImageFile = async (imageType: string, filename: string) => {
  const root = '/Users/dima/Desktop/study/newNode/SNbackend/images';

  const originalImagePath = path.join(root, imageType, 'originals', filename);
  const compressedImagePath = path.join(root, imageType, 'compressed', filename);

  Promise.all([
    fs.existsSync(originalImagePath) ? fs.promises.unlink(originalImagePath) : null,
    fs.existsSync(compressedImagePath) ? fs.promises.unlink(compressedImagePath) : null,
  ]);
};

export const compressImageFile = async (imageType: string, filename: string, quality: number, mediaType: string) => {
  const root = '/Users/dima/Desktop/study/newNode/SNbackend/images';

  const originalImagePath = path.join(root, imageType, 'originals', filename);
  const compressedImagePath = path.join(root, imageType, 'compressed', filename);

  let instance = sharp(originalImagePath);

  switch (mediaType) {
    case 'image/png': {
      instance = instance.png({ quality });
      break;
    }
    case 'image/jpg': {
      instance = instance.jpeg({ quality });
      break;
    }
    case 'image/jpeg': {
      instance = instance.jpeg({ quality });
      break;
    }
    case 'image/gif': {
      instance = instance.gif();
      return;
    }
  }

  await instance.toFile(compressedImagePath);
};
