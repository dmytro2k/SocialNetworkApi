import 'express-async-errors'
import express from 'express'
import authRouter from './routes/auth'
import dotenv from 'dotenv'
import { notFoundMiddleware } from './middlewares/notFound'
import { errorHandlerMiddleware } from './middlewares/errorHandler'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000
const start = async () => {
  try {
    // const users = await prisma.user.findMany()
    // console.log(users)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
