import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { posts, likes, comments, profiles, followers, chatRooms, messages } from '../index';

export const users = pgTable('users', {
  userId: uuid('user_id').defaultRandom().primaryKey(),
  userEmail: text('user_email').notNull().unique(),
  userPassword: text('user_password').notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  likes: many(likes),
  comments: many(comments),
  profile: one(profiles),
  followers: many(followers, { relationName: 'follower' }),
  followedUsers: many(followers, { relationName: 'followed_user' }),
  firstUsers: many(chatRooms, { relationName: 'first_user' }),
  secondUsers: many(chatRooms, { relationName: 'second_user' }),
  messages: many(messages),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
