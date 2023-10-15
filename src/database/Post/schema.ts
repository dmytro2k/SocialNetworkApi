import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users } from '../User/schema';
import { likes } from '../Like/schema';
import { comments } from '../Comment/schema';
import { images } from '../Image/schema';

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  imageId: uuid('imageId').references(() => images.id, { onDelete: 'set null', onUpdate: 'cascade' }),
});

export const postRelations = relations(posts, ({ one, many }) => ({
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
