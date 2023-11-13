import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { posts, likes, comments, profiles, followers } from '../index';

export const users = pgTable('users', {
  userId: uuid('user_id').defaultRandom().primaryKey(),
  userEmail: text('user_email').notNull().unique(),
  userPassword: text('user_password').notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  likes: many(likes),
  comments: many(comments),
  profiles: one(profiles),
  follower: many(followers, { relationName: 'follower' }),
  followedUser: many(followers, { relationName: 'followed_user' }),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
