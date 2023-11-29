import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users } from '../index';

export const chatRooms = pgTable('chat_rooms', {
  chatRoomId: uuid('chat_room_id').defaultRandom().primaryKey(),
  firstUserId: uuid('first_user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  secondUserId: uuid('second_user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const chatRoomsRelations = relations(chatRooms, ({ one }) => ({
  follower: one(users, {
    fields: [chatRooms.firstUserId],
    references: [users.userId],
    relationName: 'first_user',
  }),
  followedUser: one(users, {
    fields: [chatRooms.secondUserId],
    references: [users.userId],
    relationName: 'second_user',
  }),
}));

export type ChatRoom = InferSelectModel<typeof chatRooms>;
export type NewChatRoom = InferInsertModel<typeof chatRooms>;
