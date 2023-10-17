import { User } from '../src/database/Schema/User/schema';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
