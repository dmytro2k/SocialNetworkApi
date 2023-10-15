import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { images } from '../database/Image/schema';
import path from 'path';
import { NotFoundError } from '../errors';
import { deleteImageFile } from '../utils/image';

export const createImage = async (file: Express.Multer.File) => {
  const extension = path.extname(file.filename);
  const name = path.basename(file.filename, extension);

  const [image] = await DrizzleProvider.getInstance().insert(images).values({ name, extension }).returning();
  return image.id;
};

export const deleteImageById = async (id: string) => {
  const image = await getImageById(id);

  if (!image) {
    throw new NotFoundError('Not found such a post');
  }
  const imagename = image.name + image.extension;

  Promise.all([DrizzleProvider.getInstance().delete(images).where(eq(images.id, id)), deleteImageFile(image.imageType, imagename)]);
};

export const getImageById = async (id: string) => {
  const [image] = await DrizzleProvider.getInstance().select().from(images).where(eq(images.id, id));

  return image;
};
