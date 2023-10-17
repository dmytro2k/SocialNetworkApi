import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { posts, likes, comments, profiles } from '../index';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  likes: many(likes),
  comments: many(comments),
  profiles: one(profiles),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
