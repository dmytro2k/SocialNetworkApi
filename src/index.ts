import 'express-async-errors';
import dotenv from 'dotenv';

dotenv.config();

import { DrizzleProvider } from './database/dataProvider';
import express from 'express';
import cors from 'cors'

import { users } from './database/User/schema';
import { posts } from './database/Post/schema';
import { NewLike, likes } from './database/Like/schema';
import { NewComment, comments } from './database/Comments/schema';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import { notFoundMiddleware } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    const db = DrizzleProvider.getInstance()

    // const allUsers = await db.select().from(users)
    // const allPosts = await db.select().from(posts)

    // const usersWithPosts = await db.query.users.findFirst({with: {posts: true}})
    // console.log(usersWithPosts);

    // const newLike: NewLike = { userId: 'b4407c32-fb78-4555-9ac8-a65f08949108', postId: '5cadd78a-dfd5-4f78-bbce-7d95518136df' }
    // await db.insert(likes).values(newLike)

    // const newComment: NewComment = { content: 'it is very true', userId: 'b4407c32-fb78-4555-9ac8-a65f08949108', postId: '5cadd78a-dfd5-4f78-bbce-7d95518136df' }
    // await db.insert(comments).values(newComment)

    // const postsWithLikes = await db.query.posts.findFirst({with: { likes: true, comments: true }})
    // console.log(postsWithLikes);

    // console.log('users:', allUsers);
    // console.log('posts', allPosts);

    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
