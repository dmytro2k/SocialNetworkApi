import express from 'express'
import { getPost, getUserPosts, createPost, updatePost, deletePost } from '../controllers/posts'
import { body } from 'express-validator'

const createPostVal = [
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString(),
  body('userId').notEmpty().isString(), 
]

const updatePostVal = [
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString()
]

const postVal = [
  body('userId').notEmpty().isString(),
]

const router = express.Router()

router.route('/').get(postVal, getUserPosts).post(createPostVal, createPost)
router.route('/:id').get(getPost).patch(updatePostVal, updatePost).delete(deletePost)

export default router