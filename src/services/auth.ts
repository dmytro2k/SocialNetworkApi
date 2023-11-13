import { DrizzleProvider } from '../database/dataProvider';
import { BadRequestError, NotFoundError } from '../errors';
import { createJWT } from '../utils/auth';
import { hashPassword, comparePasswords } from '../utils/auth';
import { users } from '../database/Schema';
import { createProfile } from './profile';
import { getUserByEmail } from './user';

type AuthProps = {
  userEmail: string;
  userPassword: string;
};

export const userRegister = async ({ userEmail, userPassword }: AuthProps) => {
  const existedUser = await getUserByEmail({ userEmail });

  if (existedUser) {
    throw new BadRequestError('Email is already taken');
  }

  const hashedPassword = await hashPassword(userPassword);

  const [user] = await DrizzleProvider.getInstance()
    .insert(users)
    .values({
      userEmail,
      userPassword: hashedPassword,
    })
    .returning();

  const profileName = user.userEmail.split('@')[0];
  await createProfile({ profileName, userId: user.userId });

  const token = createJWT(user.userId);
  return { token, userId: user.userId };
};

export const userLogin = async ({ userEmail, userPassword }: AuthProps) => {
  const user = await getUserByEmail({ userEmail });

  if (!user) {
    throw new NotFoundError('User cannot be found');
  }

  await comparePasswords(userPassword, user.userPassword);

  const token = createJWT(user.userId);
  return { token, userId: user.userId };
};
