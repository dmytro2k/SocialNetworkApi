import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError, BadRequestError, UnauthenticatedError } from '../errors';
import { posts } from '../database/Schema';
import { User } from '../database/Schema';
import { deleteImageById, createImage } from './image';

export const createNewPost = async (title: string, content: string, user?: User, imageId?: string) => {
  if (title === '' || content === '') {
    throw new BadRequestError('title and content should not be empty');
  }

  const [post] = await DrizzleProvider.getInstance().insert(posts).values({ title, content, userId: user!.id, imageId }).returning();
  return post;
};

export const updatePost = async (id: string, possibleUpdates: { title?: string; content?: string; imageId?: string }, user?: User) => {
  const postUpdates = Object.fromEntries(Object.entries(possibleUpdates).filter((el) => el[1] !== undefined && el[1] !== ''));

  if (!postUpdates) {
    throw new BadRequestError('There is no changes');
  }

  let post = await getPostById(id);

  if (!post) {
    throw new NotFoundError('Not found such a post');
  }

  if (user!.id !== post.userId) {
    throw new UnauthenticatedError('Only Author can update a post');
  }

  if (post.imageId && possibleUpdates.imageId) {
    deleteImageById(post.imageId);
  }

  [post] = await DrizzleProvider.getInstance().update(posts).set(postUpdates).where(eq(posts.id, id)).returning();
  return post;
};

export const deletePostById = async (id: string, user?: User) => {
  const post = await getPostById(id);

  if (!post) {
    throw new NotFoundError('Not found such a post');
  }

  if (user!.id !== post.userId) {
    throw new UnauthenticatedError('Only Author can delete a post');
  }

  if (post.imageId) {
    deleteImageById(post.imageId);
  }

  await DrizzleProvider.getInstance().delete(posts).where(eq(posts.id, id));
};

export const getPostById = async (id: string) => {
  const [post] = await DrizzleProvider.getInstance().select().from(posts).where(eq(posts.id, id));

  if (!post) {
    throw new NotFoundError('Not found such a post');
  }

  return post;
};

export const getAllUserPosts = async (id: string) => {
  const post = await DrizzleProvider.getInstance().select().from(posts).where(eq(posts.userId, id));

  return post;
};
