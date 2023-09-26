import { pgTable, text, uuid} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { users } from '../User/schema'

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: uuid('userId').notNull().references(() => users.id)
});

export const postRelations = relations(posts, ({one}) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id]
  })
}))

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;