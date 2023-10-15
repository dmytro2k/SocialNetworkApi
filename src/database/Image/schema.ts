import { pgTable, pgEnum, uuid, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { posts } from '../Post/schema';

export const imageTypeEnum = pgEnum('type', ['post', 'avatar']);

export const images = pgTable('images', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: uuid('name').notNull().unique(),
  extension: text('extension').notNull(),
  imageType: imageTypeEnum('type').default('post').notNull(),
});

export const imagesRelations = relations(images, ({ one }) => ({
  posts: one(posts),
}));

export type Image = InferSelectModel<typeof images>;
export type NewImage = InferInsertModel<typeof images>;
