import { eq, sql } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { comments } from '../database/Schema';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors';

type CreateNewCommentsProps = {
  userId: string;
  postId: string;
  commentContent: string;
};

type GetAllCommentsProps = {
  postId: string;
};

type DropCommentProps = {
  userId: string;
  commentId: string;
};

type GetCommentByIdProps = {
  commentId: string;
};

type UpdateCommentProps = {
  userId: string;
  commentId: string;
  commentContent: string;
};

export const createNewComment = async ({ userId, postId, commentContent }: CreateNewCommentsProps) => {
  const [comment] = await DrizzleProvider.getInstance().insert(comments).values({ commentContent, userId, postId }).returning();

  return comment;
};

export const updateComment = async ({ userId, commentId, commentContent }: UpdateCommentProps) => {
  if (!commentContent) {
    throw new BadRequestError('should have some text');
  }

  let comment = await getCommentById({ commentId });

  if (!comment) {
    throw new NotFoundError('not found such comment');
  }

  if (comment.userId !== userId) {
    throw new UnauthenticatedError('unauthorized');
  }

  [comment] = await DrizzleProvider.getInstance()
    .update(comments)
    .set({ commentContent, commentEdited: true })
    .where(eq(comments.commentId, commentId))
    .returning();

  return comment;
};

export const dropComment = async ({ userId, commentId }: DropCommentProps) => {
  const comment = await getCommentById({ commentId });

  if (!comment) {
    throw new NotFoundError('not found such comment');
  }

  if (comment.userId !== userId) {
    throw new UnauthenticatedError('unauthorized');
  }

  await DrizzleProvider.getInstance().delete(comments).where(eq(comments.commentId, commentId));
};

export const getAllComments = async ({ postId }: GetAllCommentsProps) => {
  const postComments = await DrizzleProvider.getInstance()
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);

  return postComments;
};

export const getCommentById = async ({ commentId }: GetCommentByIdProps) => {
  const [comment] = await DrizzleProvider.getInstance().select().from(comments).where(eq(comments.commentId, commentId));

  return comment;
};
