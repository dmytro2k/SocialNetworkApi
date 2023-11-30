import { eq, sql, and, ilike, exists } from 'drizzle-orm';
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
  profileUpdates: { profileName: string; profileStatus: string; imageId?: string };
  user?: User;
};

type GetProfileByUserIdProps = {
  userId: string;
};

type GetProfilesProps = {
  currentUserId: string;
  userId: string;
  searchString: string;
};

type getProfileByIdProps = {
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

export const updateProfile = async ({ profileUpdates, user }: UpdateProfileProps) => {
  if (!profileUpdates.profileName) {
    throw new BadRequestError('Name should not be empty');
  }

  const profile = await getMyProfile({ userId: user!.userId });

  if (profile.imageId && profileUpdates.imageId) {
    deleteImageById({ imageId: profile.imageId });
  }

  const [updatedProfile] = await DrizzleProvider.getInstance()
    .update(profiles)
    .set({ ...profileUpdates, updatedAt: new Date(Date.now()) })
    .where(eq(profiles.userId, user!.userId))
    .returning();
  return updatedProfile;
};

export const getMyProfile = async ({ userId }: GetProfileByUserIdProps) => {
  const [profile] = await DrizzleProvider.getInstance().select().from(profiles).where(eq(profiles.userId, userId));

  return profile;
};

export const getProfileByUserId = async ({ userId, followerUserId }: getProfileByIdProps) => {
  const user = await getUserById({ userId });
  if (!user) {
    throw new NotFoundError('not found such user');
  }

  const [profile] = await DrizzleProvider.getInstance()
    .select({
      profileId: profiles.profileId,
      userId: profiles.userId,
      profileName: profiles.profileName,
      profileStatus: profiles.profileStatus,
      imageId: profiles.imageId,
      isFollowed: sql<boolean>`case when ${followers.followerUserId} is not null then true else false end`,
    })
    .from(profiles)
    .leftJoin(followers, and(eq(profiles.userId, followers.userId), eq(followers.followerUserId, followerUserId)))
    .where(eq(profiles.userId, userId));

  return profile;
};

export const getAllProfiles = async ({ currentUserId, userId, searchString }: GetProfilesProps) => {
  const allProfiles = await DrizzleProvider.getInstance()
    .select({
      profileId: profiles.profileId,
      userId: profiles.userId,
      profileName: profiles.profileName,
      profileStatus: profiles.profileStatus,
      imageId: profiles.imageId,
      isFollowed: sql<boolean>`${exists(
        DrizzleProvider.getInstance()
          .select()
          .from(followers)
          .where(and(eq(followers.userId, profiles.userId), eq(followers.followerUserId, currentUserId)))
      )}`,
    })
    .from(profiles)
    .leftJoin(followers, and(eq(profiles.userId, followers.userId), eq(followers.followerUserId, userId)))
    .where(ilike(profiles.profileName, `%${searchString}%`))
    .orderBy(profiles.profileName);

  return allProfiles;
};

export const getFollowedByUserProfiles = async ({ currentUserId, userId, searchString }: GetProfilesProps) => {
  const allProfiles = await DrizzleProvider.getInstance()
    .select({
      profileId: profiles.profileId,
      userId: profiles.userId,
      profileName: profiles.profileName,
      profileStatus: profiles.profileStatus,
      imageId: profiles.imageId,
      isFollowed: sql<boolean>`${exists(
        DrizzleProvider.getInstance()
          .select()
          .from(followers)
          .where(and(eq(followers.userId, profiles.userId), eq(followers.followerUserId, currentUserId)))
      )}`,
    })
    .from(profiles)
    .innerJoin(followers, and(eq(profiles.userId, followers.userId), eq(followers.followerUserId, userId)))
    .where(and(ilike(profiles.profileName, `%${searchString}%`)))
    .orderBy(profiles.profileName);

  return allProfiles;
};
