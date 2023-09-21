import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { PrismaProvider } from './dataProviders/prisma';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import { notFoundMiddleware } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await PrismaProvider.getInstance().$connect();

    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
