import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { users } from '../User/schema'
import { posts } from '../Post/schema'

export const likes = pgTable('likes', {
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  postId: uuid('postId').notNull().references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' })
}, table => {
  return {
    pk: primaryKey(table.userId, table.postId)
  }
});

export const likesRelations = relations(likes, ({one}) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id]
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id]
  })
}))

export type Like = InferSelectModel<typeof likes>;
export type NewLike = InferInsertModel<typeof likes>;
