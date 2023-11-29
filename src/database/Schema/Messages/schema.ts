import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users, chatRooms } from '../index';

export const messages = pgTable('messages', {
  messageId: uuid('message_id').defaultRandom().primaryKey(),
  messageContent: text('message_content').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  chatRoomId: uuid('chat_room_id')
    .notNull()
    .references(() => chatRooms.chatRoomId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  messageEdited: boolean('message_edited').notNull().default(false),
  updatedAt: timestamp('updated_at', { precision: 0, withTimezone: false }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { precision: 0, withTimezone: false }).notNull().defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  author: one(users, {
    fields: [messages.userId],
    references: [users.userId],
  }),
  chatRoom: one(chatRooms, {
    fields: [messages.chatRoomId],
    references: [chatRooms.chatRoomId],
  }),
}));

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;
