import { eq, sql, and, like, or } from 'drizzle-orm';
import { DrizzleProvider } from '../database/dataProvider';
import { followers, profiles } from '../database/Schema';
import { User } from '../database/Schema';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors';
import { deleteImageById } from './image';
import { getUserById } from './user';

type CreateProfileProps = {
  profileName: string;
  userId: string;
  profileStatus?: string;
  imageId?: string;
};

type UpdateProfileProps = {
  possibleUpdates: { profileName?: string; profileStatus?: string; imageId?: string };
  user?: User;
};

type GetProfileByIdProps = {
  profileId: string;
};

type GetProfileByUserIdProps = {
  userId: string;
};

type GetProfilesSpecialProps = {
  followerUserId: string;
  searchString: string;
};

type getProfileSpecialProps = {
  userId: string;
  followerUserId: string;
};

export const createProfile = async ({ profileName, userId, profileStatus, imageId }: CreateProfileProps) => {
  const [profile] = await DrizzleProvider.getInstance()
    .insert(profiles)
    .values({ profileName, profileStatus, userId, imageId })
    .returning();

  return profile;
};

export const updateProfile = async ({ possibleUpdates, user }: UpdateProfileProps) => {
  const profileUpdates = Object.fromEntries(Object.entries(possibleUpdates).filter((el) => el[1] !== undefined));

  if (profileUpdates.profileName === '') {
    throw new BadRequestError('Name should not be empty');
  }

  if (!profileUpdates) {
    throw new BadRequestError('There is no changes');
  }

  let profile = await getMyProfile({ userId: user!.userId });

  if (profile.imageId && profileUpdates.imageId) {
    deleteImageById({ imageId: profile.imageId });
  }

  [profile] = await DrizzleProvider.getInstance().update(profiles).set(profileUpdates).where(eq(profiles.userId, user!.userId)).returning();
  return profile;
};

export const getMyProfile = async ({ userId }: GetProfileByUserIdProps) => {
  const [profile] = await DrizzleProvider.getInstance().select().from(profiles).where(eq(profiles.userId, userId));

  return profile;
};

export const getProfileById = async ({ profileId }: GetProfileByIdProps) => {
  const [profile] = await DrizzleProvider.getInstance().select().from(profiles).where(eq(profiles.profileId, profileId));

  return profile;
};

export const getProfileByUserId = async ({ userId, followerUserId }: getProfileSpecialProps) => {
  const user = await getUserById({ userId });
  if (!user) {
    throw new NotFoundError('Not found such user');
  }

  const profile = await DrizzleProvider.getInstance()
    .select({
      profileId: profiles.profileId,
      userId: profiles.userId,
      profileName: profiles.profileName,
      profileStatus: profiles.profileStatus,
      imageId: profiles.imageId,
      isFollowedByMe: sql<boolean>`case when followers.follower_user_id is not null then true else false end`,
    })
    .from(profiles)
    .leftJoin(followers, and(eq(profiles.userId, followers.userId), eq(followers.followerUserId, followerUserId)))
    .where(eq(profiles.userId, userId));

  return profile;
};

export const getAllProfiles = async ({ followerUserId, searchString }: GetProfilesSpecialProps) => {
  const allProfiles = await DrizzleProvider.getInstance()
    .select({
      profileId: profiles.profileId,
      userId: profiles.userId,
      profileName: profiles.profileName,
      profileStatus: profiles.profileStatus,
      imageId: profiles.imageId,
      isFollowedByMe: sql<boolean>`case when ${followers.followerUserId} is not null then true else false end`,
    })
    .from(profiles)
    .leftJoin(followers, and(eq(profiles.userId, followers.userId), eq(followers.followerUserId, followerUserId)))
    .where(like(profiles.profileName, `%${searchString}%`))
    .orderBy(profiles.profileName);

  return allProfiles;
};

export const getFollowedByUserProfiles = async ({ followerUserId, searchString }: GetProfilesSpecialProps) => {
  const allProfiles = await DrizzleProvider.getInstance()
    .select({
      profileId: profiles.profileId,
      userId: profiles.userId,
      profileName: profiles.profileName,
      profileStatus: profiles.profileStatus,
      imageId: profiles.imageId,
    })
    .from(profiles)
    .innerJoin(followers, and(eq(profiles.userId, followers.userId), eq(followers.followerUserId, followerUserId)))
    .where(and(like(profiles.profileName, `%${searchString}%`)))
    .orderBy(profiles.profileName);

  return allProfiles;
};
