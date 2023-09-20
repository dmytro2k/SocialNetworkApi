import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PrismaClient } from '@prisma/client'
import { validate } from '../middlewares/validation'

const prisma = new PrismaClient()

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id
  const post = await prisma.post.findUnique({where: {id}})

  res.status(StatusCodes.OK).json({post})
}

export const getUserPosts = async (req: Request, res: Response) => {
  validate(req, res)

  const { userId } = req.body
  const posts = await prisma.post.findMany({where: {userId}})

  res.status(StatusCodes.OK).json({posts})
}

export const createPost = async (req: Request, res: Response) => {
  validate(req, res)

  const { title, content, userId } = req.body
  const post = await prisma.post.create({data: { title, content, userId }})

  res.status(StatusCodes.CREATED).json({post})
}

export const updatePost = async (req: Request, res: Response) => {
  validate(req, res)

  const id = req.params.id
  const { title, content } = req.body
  const post = await prisma.post.update({where: {id}, data: { title, content }})

  res.status(StatusCodes.OK).json({post})
}

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id
  const post = await prisma.post.delete({where: {id}})

  res.status(StatusCodes.OK).send()
}