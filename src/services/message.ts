import { desc, eq } from 'drizzle-orm';
import { messages } from '../database/Schema';
import { DrizzleProvider } from '../database/dataProvider';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors';
import { getChatRoomById } from './chatRoom';

type CreateNewMessageProps = {
  userId: string;
  chatRoomId: string;
  messageContent: string;
};

type UpdateMessageProps = {
  userId: string;
  messageId: string;
  messageContent: string;
};

type DeleteMessageProps = {
  userId: string;
  messageId: string;
};

type GetAllChatMessagesProps = {
  userId: string;
  chatRoomId: string;
};

type GetMessageByIdProps = {
  messageId: string;
};

export const createNewMessage = async ({ userId, chatRoomId, messageContent }: CreateNewMessageProps) => {
  if (!messageContent) {
    throw new BadRequestError('message cannot be empty');
  }

  const [message] = await DrizzleProvider.getInstance().insert(messages).values({ userId, chatRoomId, messageContent }).returning();

  return message;
};

export const updateMessage = async ({ userId, messageId, messageContent }: UpdateMessageProps) => {
  const message = await getMessageById({ messageId });

  if (!message) {
    throw new NotFoundError('not found such a message');
  }

  if (message.userId !== userId) {
    throw new UnauthenticatedError('unauthorized');
  }

  if (!messageContent) {
    throw new BadRequestError('message cannot be empty');
  }

  const [updatedMessage] = await DrizzleProvider.getInstance()
    .update(messages)
    .set({ messageContent, messageEdited: true, updatedAt: new Date(Date.now()) })
    .where(eq(messages.messageId, messageId))
    .returning();

  return updatedMessage;
};

export const deleteMessage = async ({ userId, messageId }: DeleteMessageProps) => {
  const message = await getMessageById({ messageId });

  if (!message) {
    throw new NotFoundError('not found such a message');
  }

  if (message.userId !== userId) {
    throw new UnauthenticatedError('unauthorized');
  }

  await DrizzleProvider.getInstance().delete(messages).where(eq(messages.messageId, messageId));
};

export const getAllChatMessages = async ({ userId, chatRoomId }: GetAllChatMessagesProps) => {
  const chatroom = await getChatRoomById({ chatRoomId });

  if (!chatroom) {
    throw new NotFoundError('not found such a chatroom');
  }

  if (userId !== chatroom.firstUserId && userId !== chatroom.secondUserId) {
    throw new UnauthenticatedError('unauthorized');
  }

  const allMessages = await DrizzleProvider.getInstance()
    .select()
    .from(messages)
    .where(eq(messages.chatRoomId, chatRoomId))
    .orderBy(messages.createdAt);
  return allMessages;
};

const getMessageById = async ({ messageId }: GetMessageByIdProps) => {
  const [message] = await DrizzleProvider.getInstance().select().from(messages).where(eq(messages.messageId, messageId));
  return message;
};
