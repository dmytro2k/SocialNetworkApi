import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, relations } from 'drizzle-orm';
import { users, images } from '../index';

export const profiles = pgTable('profiles', {
  profileId: uuid('profile_id').defaultRandom().primaryKey(),
  profileName: text('profile_name').notNull(),
  profileStatus: text('profile_status'),
  userId: uuid('user_id')
    .unique()
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' }),
  imageId: uuid('image_id').references(() => images.imageId, { onDelete: 'set null', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.userId],
  }),
  image: one(images, {
    fields: [profiles.imageId],
    references: [images.imageId],
  }),
}));

export type Profile = InferSelectModel<typeof profiles>;
export type NewProfile = InferInsertModel<typeof profiles>;
