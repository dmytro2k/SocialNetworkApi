import { pgTable, pgEnum, uuid, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { posts, profiles } from '../index';

export const imageTypeEnum = pgEnum('type', ['post', 'avatar']);

export const images = pgTable('images', {
  id: uuid('id').defaultRandom().primaryKey().unique(),
  name: uuid('name').notNull().unique(),
  extension: text('extension').notNull(),
  imageType: imageTypeEnum('image_type').default('post').notNull(),
});

export const imagesRelations = relations(images, ({ one }) => ({
  posts: one(posts),
  profiles: one(profiles),
}));

export type Image = InferSelectModel<typeof images>;
export type NewImage = InferInsertModel<typeof images>;
