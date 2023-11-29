import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetAllMessagesParams, TypedRequest } from '../interfaces';
import { getAllChatMessages } from '../services/message';

export const getAllMessages = async (req: TypedRequest<{}, GetAllMessagesParams, {}>, res: Response) => {
  const { user } = req;
  const { chatRoomId } = req.params;

  const allMessages = await getAllChatMessages({ userId: user!.userId, chatRoomId });
  res.status(StatusCodes.OK).json(allMessages);
};
