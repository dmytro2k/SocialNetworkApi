import { eq, and } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { followers, Follower } from '../database/Schema';
import { BadRequestError, NotFoundError } from '../errors';
import { getUserById } from './user';

export const createNewFollower = async ({ userId, followerUserId }: Follower) => {
  if (userId === followerUserId) {
    throw new BadRequestError('Users cannot follow themself');
  }

  const user = await getUserById({ userId });
  if (!user) {
    throw new NotFoundError('Not found such user');
  }

  await DrizzleProvider.getInstance().insert(followers).values({ userId, followerUserId });
};

export const dropFollower = async ({ userId, followerUserId }: Follower) => {
  const user = await getUserById({ userId });
  if (!user) {
    throw new NotFoundError('Not found such user');
  }

  const follower = await getFollower({ userId, followerUserId });
  if (!follower) {
    throw new NotFoundError('Not found such follower');
  }

  await DrizzleProvider.getInstance()
    .delete(followers)
    .where(and(eq(followers.userId, userId), eq(followers.followerUserId, followerUserId)));
};

export const getFollower = async ({ userId, followerUserId }: Follower) => {
  const [follower] = await DrizzleProvider.getInstance()
    .select()
    .from(followers)
    .where(and(eq(followers.userId, userId), eq(followers.followerUserId, followerUserId)));
  return follower;
};
