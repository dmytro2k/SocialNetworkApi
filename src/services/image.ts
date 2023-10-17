import { eq } from 'drizzle-orm';
import path from 'path';
import { DrizzleProvider } from '../database/dataProvider';
import { images } from '../database/Schema';
import { NotFoundError } from '../errors';
import { deleteImageFile } from '../utils/image';

export const createImage = async (file: Express.Multer.File, imageType?: 'avatar') => {
  const extension = path.extname(file.filename);
  const name = path.basename(file.filename, extension);

  const [image] = await DrizzleProvider.getInstance().insert(images).values({ name, extension, imageType }).returning();
  return image.id;
};

export const deleteImageById = async (id: string) => {
  const image = await getImageById(id);

  if (!image) {
    throw new NotFoundError('Not found such image');
  }
  const imagename = image.name + image.extension;

  Promise.all([DrizzleProvider.getInstance().delete(images).where(eq(images.id, id)), deleteImageFile(image.imageType, imagename)]);
};

export const getImageById = async (id: string) => {
  const [image] = await DrizzleProvider.getInstance().select().from(images).where(eq(images.id, id));

  return image;
};
