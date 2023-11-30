import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

import http from 'http';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import profilesRouter from './routes/profiles';
import imageRouter from './routes/images';
import followersRouter from './routes/followers';
import likesRouter from './routes/likes';
import commentsRouter from './routes/comments';
import chatRoomsRouter from './routes/chatRooms';
import messagesRouter from './routes/messages';
import { DrizzleProvider } from './database/dataProvider';
import { notFoundMiddleware } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { JoinRoomEventPayload, SendMessageEventPayload, UpdateMessageEventPayload } from './interfaces';
import SocketIO from 'socket.io';
import { createNewMessage, updateMessage } from './services/message';
import { verifyToken } from './utils/auth';
import { getChatRoomById } from './services/chatRoom';

const app = express();
const server = http.createServer(app);

export const io = new SocketIO.Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', async (socket) => {
  try {
    socket.on('JoinRoomEvent', async (payload: JoinRoomEventPayload) => {
      const user = await verifyToken({ token: payload.token });
      const chatRoom = await getChatRoomById({ chatRoomId: payload.chatRoomId });
      if (chatRoom.firstUserId !== user.userId && chatRoom.secondUserId !== user.userId) {
        socket.emit('Error', { msg: 'unauthorized' });
        return;
      }
      socket.join(payload.chatRoomId);
    });

    socket.on('UpdateMessageEvent', async (payload: UpdateMessageEventPayload) => {
      const { chatRoomId, messageContent, messageId, userId } = payload;
      const message = await updateMessage({ messageContent, messageId, userId });

      io.to(chatRoomId).emit('ReceiveUpdateMessageEvent', message);
    });

    socket.on('SendMessageEvent', async (payload: SendMessageEventPayload) => {
      const { messageContent, chatRoomId, userId } = payload;
      const message = await createNewMessage({ userId, chatRoomId, messageContent });

      io.to(chatRoomId).emit('ReceiveMessageEvent', message);
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/profiles', profilesRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/followers', followersRouter);
app.use('/api/v1/likes', likesRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/chatrooms', chatRoomsRouter);
app.use('/api/v1/messages', messagesRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    DrizzleProvider.runMigrations();
    server.listen(Number(port), () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
