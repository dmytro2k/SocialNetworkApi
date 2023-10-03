import { pgTable, text, uuid} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { posts } from '../Post/schema'
import { likes } from "../Like/schema";
import { comments } from "../Comments/schema";

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
});

export const userRelations = relations(users, ({many}) => ({
  posts: many(posts),
  likes: many(likes),
  comments: many(comments)
}))

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;