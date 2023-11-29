import { and, eq, ne, or } from 'drizzle-orm';
import { chatRooms, profiles } from '../database/Schema';
import { DrizzleProvider } from '../database/dataProvider';
import { NotFoundError, UnauthenticatedError } from '../errors';

type FindOrCreateChatRoomProps = {
  firstUserId: string;
  secondUserId: string;
};

type GetUserChatRoomsProps = {
  userId: string;
};

type GetChatRoomByIdProps = {
  chatRoomId: string;
};

export const findOrCreateChatRoom = async ({ firstUserId, secondUserId }: FindOrCreateChatRoomProps) => {
  const [chatRoom] = await DrizzleProvider.getInstance()
    .select()
    .from(chatRooms)
    .where(
      or(
        and(eq(chatRooms.firstUserId, firstUserId), eq(chatRooms.secondUserId, secondUserId)),
        and(eq(chatRooms.firstUserId, secondUserId), eq(chatRooms.secondUserId, firstUserId))
      )
    );

  if (!chatRoom) {
    const [NewChatRoom] = await DrizzleProvider.getInstance().insert(chatRooms).values({ firstUserId, secondUserId }).returning();
    return NewChatRoom;
  }

  return chatRoom;
};

export const getUserChatRooms = async ({ userId }: GetUserChatRoomsProps) => {
  if (!userId) {
    throw new UnauthenticatedError('unauthorized');
  }

  const allChatRooms = await DrizzleProvider.getInstance()
    .select({
      chatRoomId: chatRooms.chatRoomId,
      firstUserId: chatRooms.firstUserId,
      secondUserId: chatRooms.secondUserId,
      profileImageId: profiles.imageId,
      prfileName: profiles.profileName,
    })
    .from(chatRooms)
    .innerJoin(
      profiles,
      and(or(eq(profiles.userId, chatRooms.firstUserId), eq(profiles.userId, chatRooms.secondUserId)), ne(profiles.userId, userId))
    )
    .where(or(eq(chatRooms.firstUserId, userId), eq(chatRooms.secondUserId, userId)));
  return allChatRooms;
};

export const getChatRoomById = async ({ chatRoomId }: GetChatRoomByIdProps) => {
  const [chatRoom] = await DrizzleProvider.getInstance().select().from(chatRooms).where(eq(chatRooms.chatRoomId, chatRoomId));
  return chatRoom;
};
