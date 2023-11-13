import { eq, sql, exists, and } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError, BadRequestError, UnauthenticatedError } from '../errors';
import { comments, likes, posts } from '../database/Schema';
import { User } from '../database/Schema';
import { deleteImageById } from './image';
import { getUserById } from './user';

type CreateNewPostProps = {
  postContent: string;
  user?: User;
  imageId?: string;
};

type UpdatePostProps = {
  postId: string;
  possibleUpdates: { postContent?: string; imageId?: string };
  user?: User;
};

type DeletePostByIdProps = {
  postId: string;
  user?: User;
};

type GetPostByIdProps = {
  postId: string;
};

type GetAllUserPostsProps = {
  userId: string;
  currentUserId: string;
};

type GetPostProps = {
  postId: string;
  currentUserId: string;
};

export const createNewPost = async ({ postContent, user, imageId }: CreateNewPostProps) => {
  if (postContent === '') {
    throw new BadRequestError('title and content should not be empty');
  }

  const [post] = await DrizzleProvider.getInstance().insert(posts).values({ postContent, userId: user!.userId, imageId }).returning();
  return post;
};

export const updatePost = async ({ postId, possibleUpdates, user }: UpdatePostProps) => {
  const postUpdates = Object.fromEntries(Object.entries(possibleUpdates).filter((el) => el[1] !== undefined && el[1] !== ''));

  if (!postUpdates) {
    throw new BadRequestError('There is no changes');
  }

  let post = await getPostById({ postId });

  if (!post) {
    throw new NotFoundError('Not found such a post');
  }

  if (user!.userId !== post.userId) {
    throw new UnauthenticatedError('Only Author can update a post');
  }

  if (post.imageId && possibleUpdates.imageId) {
    deleteImageById({ imageId: post.imageId });
  }

  [post] = await DrizzleProvider.getInstance().update(posts).set(postUpdates).where(eq(posts.postId, postId)).returning();
  return post;
};

export const deletePostById = async ({ postId, user }: DeletePostByIdProps) => {
  const post = await getPostById({ postId });

  if (!post) {
    throw new NotFoundError('Not found such a post');
  }

  if (user!.userId !== post.userId) {
    throw new UnauthenticatedError('Only Author can delete a post');
  }

  if (post.imageId) {
    deleteImageById({ imageId: post.imageId });
  }

  await DrizzleProvider.getInstance().delete(posts).where(eq(posts.postId, postId));
};

export const getPostById = async ({ postId }: GetPostByIdProps) => {
  const [post] = await DrizzleProvider.getInstance().select().from(posts).where(eq(posts.postId, postId));

  return post;
};

export const getAllUserPosts = async ({ userId, currentUserId }: GetAllUserPostsProps) => {
  const user = getUserById({ userId });
  if (!user) {
    throw new NotFoundError('not found such user');
  }

  const post = await DrizzleProvider.getInstance()
    .select({
      userId: posts.userId,
      postId: posts.postId,
      postContent: posts.postContent,
      imageId: posts.imageId,
      postEdited: posts.postEdited,
      createdAt: posts.createdAt,
      countLikes: sql<number>`cast(count(${likes.likeId}) as int)`,
      countComments: sql<number>`cast(count(${comments.commentId}) as int)`,
      isLiked: exists(
        DrizzleProvider.getInstance()
          .select()
          .from(likes)
          .where(and(eq(likes.postId, posts.postId), eq(likes.userId, currentUserId)))
      ),
    })
    .from(posts)
    .leftJoin(likes, eq(posts.postId, likes.postId))
    .leftJoin(comments, eq(posts.postId, comments.postId))
    .where(eq(posts.userId, userId))
    .groupBy(posts.postId);

  return post;
};

const getPost = async ({ postId, currentUserId }: GetPostProps) => {
  const [post] = await DrizzleProvider.getInstance()
    .select({
      userId: posts.userId,
      postId: posts.postId,
      postContent: posts.postContent,
      imageId: posts.imageId,
      postEdited: posts.postEdited,
      createdAt: posts.createdAt,
      countLikes: sql<number>`cast(count(${likes.likeId}) as int)`,
      countComments: sql<number>`cast(count(${comments.commentId}) as int)`,
      isLiked: exists(
        DrizzleProvider.getInstance()
          .select()
          .from(likes)
          .where(and(eq(likes.postId, posts.postId), eq(likes.userId, currentUserId)))
      ),
    })
    .from(posts)
    .leftJoin(likes, eq(posts.postId, likes.postId))
    .leftJoin(comments, eq(posts.postId, comments.postId))
    .where(eq(posts.postId, postId))
    .groupBy(posts.postId);

  return post;
};
