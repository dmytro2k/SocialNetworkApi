import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { BadRequestError, NotFoundError } from '../errors';
import { createJWT } from '../utils/auth';
import { hashPassword, comparePasswords } from '../utils/auth';
import { users } from '../database/User/schema';

export const userRegister = async (params: { name: string; email: string; password: string }) => {
  const { name, email, password } = params;

  const existedUser = await getUserByEmail(email);

  if (existedUser) {
    throw new BadRequestError('Email is already taken');
  }

  const hashedPassword = await hashPassword(password);

  const [user] = await DrizzleProvider.getInstance()
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  return createJWT(user.id);
};

export const userLogin = async (params: { email: string; password: string }) => {
  const { email, password } = params;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotFoundError('User cannot be found');
  }

  await comparePasswords(password, user.password);

  return createJWT(user.id);
};

export const getUserByEmail = async (email: string) => {
  const [user] = await DrizzleProvider.getInstance().select().from(users).where(eq(users.email, email));
  return user;
};

export const getUserById = async (id: string) => {
  const [user] = await DrizzleProvider.getInstance().select().from(users).where(eq(users.id, id));
  return user;
};

export const getUserWIthPosts = async (id: string) => {
  const userWithPosts = await DrizzleProvider.getInstance().query.users.findFirst({
    where: eq(users.id, id),
    columns: { name: true },
    with: {
      posts: {
        with: { likes: { columns: { userId: true } } },
      },
    },
  });

  return userWithPosts;
};
