import { eq, sql, exists, and, desc } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError, BadRequestError, UnauthenticatedError } from '../errors';
import { comments, followers, likes, posts, profiles } from '../database/Schema';
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
  postUpdates: { postContent: string; imageId?: string };
  user?: User;
};

type DropPostByIdProps = {
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

type GetAllPostsOfFollowedUsersProps = {
  currentUserId: string;
};

export const createNewPost = async ({ postContent, user, imageId }: CreateNewPostProps) => {
  if (postContent === '') {
    throw new BadRequestError('title and content should not be empty');
  }

  const [post] = await DrizzleProvider.getInstance().insert(posts).values({ postContent, userId: user!.userId, imageId }).returning();
  return post;
};

export const updatePost = async ({ postId, postUpdates, user }: UpdatePostProps) => {
  if (!postUpdates.postContent) {
    throw new BadRequestError('There is no changes');
  }

  const post = await getPost({ postId, currentUserId: user!.userId });

  if (!post) {
    throw new NotFoundError('Not found such a post');
  }

  if (user!.userId !== post.userId) {
    throw new UnauthenticatedError('Only Author can update a post');
  }

  if (post.imageId && postUpdates.imageId) {
    deleteImageById({ imageId: post.imageId });
  }

  const [updatedPost] = await DrizzleProvider.getInstance()
    .update(posts)
    .set({ ...postUpdates, postEdited: true, updatedAt: new Date(Date.now()) })
    .where(eq(posts.postId, postId))
    .returning();
  return { ...post, ...updatedPost };
};

export const dropPostById = async ({ postId, user }: DropPostByIdProps) => {
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

  const allPosts = await DrizzleProvider.getInstance()
    .select({
      userId: posts.userId,
      postId: posts.postId,
      postContent: posts.postContent,
      imageId: posts.imageId,
      postEdited: posts.postEdited,
      updatedAt: posts.updatedAt,
      createdAt: posts.createdAt,
      profileName: profiles.profileName,
      profileImageId: profiles.imageId,
      countLikes: sql<number>`cast(count(distinct ${likes.likeId}) as int)`,
      countComments: sql<number>`cast(count(distinct ${comments.commentId}) as int)`,
      isLiked: sql<boolean>`${exists(
        DrizzleProvider.getInstance()
          .select()
          .from(likes)
          .where(and(eq(likes.postId, posts.postId), eq(likes.userId, currentUserId)))
      )}`,
    })
    .from(posts)
    .leftJoin(likes, eq(posts.postId, likes.postId))
    .leftJoin(comments, eq(posts.postId, comments.postId))
    .innerJoin(profiles, eq(profiles.userId, posts.userId))
    .where(eq(posts.userId, userId))
    .groupBy(posts.postId, profiles.profileName, profiles.imageId)
    .orderBy(desc(posts.createdAt));

  return allPosts;
};

export const getAllPostsOfFollowedUsers = async ({ currentUserId }: GetAllPostsOfFollowedUsersProps) => {
  const allPosts = await DrizzleProvider.getInstance()
    .select({
      userId: posts.userId,
      postId: posts.postId,
      postContent: posts.postContent,
      imageId: posts.imageId,
      postEdited: posts.postEdited,
      updatedAt: posts.updatedAt,
      createdAt: posts.createdAt,
      profileName: profiles.profileName,
      profileImageId: profiles.imageId,
      countLikes: sql<number>`cast(count(distinct ${likes.likeId}) as int)`,
      countComments: sql<number>`cast(count(distinct ${comments.commentId}) as int)`,
      isLiked: sql<boolean>`${exists(
        DrizzleProvider.getInstance()
          .select()
          .from(likes)
          .where(and(eq(likes.postId, posts.postId), eq(likes.userId, currentUserId)))
      )}`,
    })
    .from(posts)
    .leftJoin(likes, eq(posts.postId, likes.postId))
    .leftJoin(comments, eq(posts.postId, comments.postId))
    .innerJoin(profiles, eq(profiles.userId, posts.userId))
    .where(
      exists(
        DrizzleProvider.getInstance()
          .select()
          .from(followers)
          .where(and(eq(followers.userId, posts.userId), eq(followers.followerUserId, currentUserId)))
      )
    )
    .groupBy(posts.postId, profiles.profileName, profiles.imageId)
    .orderBy(desc(posts.createdAt));

  return allPosts;
};

const getPost = async ({ postId, currentUserId }: GetPostProps) => {
  const [post] = await DrizzleProvider.getInstance()
    .select({
      userId: posts.userId,
      postId: posts.postId,
      postContent: posts.postContent,
      imageId: posts.imageId,
      postEdited: posts.postEdited,
      updatedAt: posts.updatedAt,
      createdAt: posts.createdAt,
      profileName: profiles.profileName,
      profileImageId: profiles.imageId,
      countLikes: sql<number>`cast(count(distinct ${likes.likeId}) as int)`,
      countComments: sql<number>`cast(count(distinct ${comments.commentId}) as int)`,
      isLiked: sql<boolean>`${exists(
        DrizzleProvider.getInstance()
          .select()
          .from(likes)
          .where(and(eq(likes.postId, posts.postId), eq(likes.userId, currentUserId)))
      )}`,
    })
    .from(posts)
    .leftJoin(likes, eq(posts.postId, likes.postId))
    .leftJoin(comments, eq(posts.postId, comments.postId))
    .innerJoin(profiles, eq(profiles.userId, posts.userId))
    .where(eq(posts.postId, postId))
    .groupBy(posts.postId, profiles.profileName, profiles.imageId);

  return post;
};
