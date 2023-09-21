import { type Request, type Response, type NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequestError('Data validation failed');
  }

  next();
};
