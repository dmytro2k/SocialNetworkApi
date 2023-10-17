import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { profiles } from '../database/Schema';
import { User } from '../database/Schema';
import { BadRequestError, NotFoundError } from '../errors';
import { deleteImageById } from './image';

export const createProfile = async (name: string, userId: string, status?: string, imageId?: string) => {
  const [profile] = await DrizzleProvider.getInstance().insert(profiles).values({ name, status, userId, imageId }).returning();

  return profile;
};

export const updateProfile = async (possibleUpdates: { name?: string; status?: string; imageId?: string }, user?: User) => {
  const profileUpdates = Object.fromEntries(Object.entries(possibleUpdates).filter((el) => el[1] !== undefined));

  if (profileUpdates.name === '') {
    throw new BadRequestError('Name should not be empty');
  }

  if (!profileUpdates) {
    throw new BadRequestError('There is no changes');
  }

  let profile = await getProfileByUserId(user!.id);

  if (!profile) {
    throw new NotFoundError('Not found profile');
  }

  if (profile.imageId && profileUpdates.imageId) {
    deleteImageById(profile.imageId);
  }

  [profile] = await DrizzleProvider.getInstance().update(profiles).set(profileUpdates).where(eq(profiles.userId, user!.id)).returning();
  return profile;
};

export const getProfileById = async (id: string) => {
  const [profile] = await DrizzleProvider.getInstance().select().from(profiles).where(eq(profiles.id, id));

  return profile;
};

export const getProfileByUserId = async (id: string) => {
  const [profile] = await DrizzleProvider.getInstance().select().from(profiles).where(eq(profiles.userId, id));

  return profile;
};
