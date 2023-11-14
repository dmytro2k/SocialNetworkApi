import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users, posts } from '../index';

export const comments = pgTable('comments', {
  commentId: uuid('comment_id').defaultRandom().primaryKey(),
  commentContent: text('comment_content').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.postId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  commentEdited: boolean('comment_edited').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, {
    fields: [comments.userId],
    references: [users.userId],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.postId],
  }),
}));

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;
