import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users, posts } from '../index';

export const likes = pgTable('likes', {
  likeId: uuid('like_id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.postId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.userId],
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.postId],
  }),
}));

export type Like = InferSelectModel<typeof likes>;
export type NewLike = InferInsertModel<typeof likes>;
