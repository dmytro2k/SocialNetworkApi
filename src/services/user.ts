import { eq } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { users } from '../database/Schema';

type GetUserByEmailProps = {
  userEmail: string;
};

type GetUserByIdProps = {
  userId: string;
};

export const getUserByEmail = async ({ userEmail }: GetUserByEmailProps) => {
  const [user] = await DrizzleProvider.getInstance().select().from(users).where(eq(users.userEmail, userEmail));
  return user;
};

export const getUserById = async ({ userId }: GetUserByIdProps) => {
  const [user] = await DrizzleProvider.getInstance().select().from(users).where(eq(users.userId, userId));
  return user;
};
