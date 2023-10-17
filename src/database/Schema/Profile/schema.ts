import { pgTable, text, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users, images } from '../index';

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').defaultRandom().unique(),
    name: text('name').notNull(),
    status: text('status'),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    imageId: uuid('image_id').references(() => images.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey(table.id, table.userId),
    };
  }
);

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
  image: one(images, {
    fields: [profiles.imageId],
    references: [images.id],
  }),
}));

export type Profile = InferSelectModel<typeof profiles>;
export type NewProfile = InferInsertModel<typeof profiles>;
