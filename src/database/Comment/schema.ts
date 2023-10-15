import { pgTable, uuid, text} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { users } from '../User/schema'
import { posts } from '../Post/schema'

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  postId: uuid('postId').notNull().references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' })
});

export const commentsRelations = relations(comments, ({one}) => ({
  author: one(users, {
    fields: [comments.userId],
    references: [users.id]
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  })
}))

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;
