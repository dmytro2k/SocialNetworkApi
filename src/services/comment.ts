import { eq, sql } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { comments } from '../database/Schema';

export const createComment = async (userId: string, postId: string, commentContent: string) => {
  const [comment] = await DrizzleProvider.getInstance().insert(comments).values({ commentContent, userId, postId }).returning();

  return comment;
};

export const getComments = async (postId: string) => {
  const postComments = await DrizzleProvider.getInstance().select().from(comments).where(eq(comments.postId, postId));

  return postComments;
};
