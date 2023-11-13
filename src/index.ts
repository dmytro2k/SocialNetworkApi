import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

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
import { DrizzleProvider } from './database/dataProvider';
import { notFoundMiddleware } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const app = express();
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

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // DrizzleProvider.runMigrations();
    app.listen(Number(port), () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
