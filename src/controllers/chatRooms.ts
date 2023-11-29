import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ChatRoomParams, TypedRequest } from '../interfaces';
import { findOrCreateChatRoom, getUserChatRooms } from '../services/chatRoom';

export const getChatRoom = async (req: TypedRequest<{}, ChatRoomParams, {}>, res: Response) => {
  const { user } = req;
  const { userId } = req.params;

  const chatRoom = await findOrCreateChatRoom({ firstUserId: user!.userId, secondUserId: userId });

  res.status(StatusCodes.CREATED).json(chatRoom);
};

export const getAllUserChatRooms = async (req: TypedRequest<{}, {}, {}>, res: Response) => {
  const { user } = req;

  const chatRooms = await getUserChatRooms({ userId: user!.userId });
  res.status(StatusCodes.OK).json(chatRooms);
};
