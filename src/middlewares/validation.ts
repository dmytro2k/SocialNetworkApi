import { type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestError } from '../errors'

export const validate = (req: Request, res: Response): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new BadRequestError('Data validation failed')
  }
}