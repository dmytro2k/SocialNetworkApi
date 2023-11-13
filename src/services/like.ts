import { and, eq, sql } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { comments, likes, posts } from '../database/Schema';
import { BadRequestError, NotFoundError } from '../errors';

type LikeProps = {
  userId: string;
  postId: string;
};

export const createNewLike = async ({ userId, postId }: LikeProps) => {
  let [like] = await DrizzleProvider.getInstance()
    .select()
    .from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
  if (like !== null || like !== undefined) {
    throw new BadRequestError('you already liked that post');
  }

  [like] = await DrizzleProvider.getInstance().insert(likes).values({ userId, postId }).returning();

  return like;
};

export const deleteLike = async ({ userId, postId }: LikeProps) => {
  let [like] = await DrizzleProvider.getInstance()
    .select()
    .from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
  if (!like) {
    throw new NotFoundError('not found such like');
  }

  await DrizzleProvider.getInstance()
    .delete(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
};
