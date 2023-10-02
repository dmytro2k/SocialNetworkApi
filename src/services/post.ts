import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError, BadRequestError, UnauthenticatedError } from '../errors';
import { posts } from '../database/Post/schema';
import { User } from '../database/User/schema';

export const createNewPost = async (params: { title: string, content: string, user: User | undefined }) => {
  const { title, content, user } = params;

  if(title === '' || content === ''){
    throw new BadRequestError('title and content should not be empty')
  }

  const [post] = await DrizzleProvider.getInstance().insert(posts).values({ title, content, userId: user!.id }).returning()
  return post
}

export const updatePost = async (params: { id: string, possibleUpdates: {title?: string, content?: string}, user: User | undefined }) => {
  const { id, possibleUpdates, user } = params 

  const postUpdates = Object.fromEntries(Object.entries(possibleUpdates).filter(el => el[1] !== undefined && el[1] !== ''));
  
  if(!postUpdates){
    throw new BadRequestError('There is no changes')
  }

  let post = await getPostById(id)

  if(user!.id !== post.userId){
    throw new UnauthenticatedError('Only Author can update a post')
  }
  
  if(!post){
    throw new NotFoundError('Not found such a post')
  }

  [post] = await DrizzleProvider.getInstance().update(posts).set(postUpdates).where(eq(posts.id, id)).returning()
  return post
}

export const deletePostById = async (params: { id: string, user: User | undefined }) => {
  const { id, user } = params
  const post = await getPostById(id)
  
  if(user!.id !== post.userId){
    throw new UnauthenticatedError('Only Author can delete a post')
  }

  if(!post){
    throw new NotFoundError('Not found such a post')
  }

  await DrizzleProvider.getInstance().delete(posts).where(eq(posts.id, id))
}

export const getPostById = async (id: string) => {
  const [post] = await DrizzleProvider.getInstance().select().from(posts).where(eq(posts.id, id))

  return post
}

export const getAllUserPosts = async (id: string) => {
  const post = await DrizzleProvider.getInstance().select().from(posts).where(eq(posts.userId, id))

  return post
}