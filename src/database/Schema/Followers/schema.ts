import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users } from '../index';

export const followers = pgTable(
  'followers',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
    followerUserId: uuid('follower_user_id')
      .notNull()
      .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey(table.userId, table.followerUserId),
    };
  }
);

export const followersRelations = relations(followers, ({ one }) => ({
  follower: one(users, {
    fields: [followers.followerUserId],
    references: [users.userId],
    relationName: 'follower',
  }),
  followedUser: one(users, {
    fields: [followers.userId],
    references: [users.userId],
    relationName: 'followed_user',
  }),
}));

export type Follower = InferSelectModel<typeof followers>;
export type NewFollower = InferInsertModel<typeof followers>;
