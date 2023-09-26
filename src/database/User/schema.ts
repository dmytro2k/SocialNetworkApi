import { pgTable, text, uuid} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { posts } from '../Post/schema'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
});

export const userRelations = relations(users, ({many}) => ({
  posts: many(posts)
}))

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;