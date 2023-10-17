import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users, likes, comments, images } from '../index';

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  imageId: uuid('image_id').references(() => images.id, { onDelete: 'set null', onUpdate: 'cascade' }),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  image: one(images, {
    fields: [posts.imageId],
    references: [images.id],
  }),
  likes: many(likes),
  comments: many(comments),
}));

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
