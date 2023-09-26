import { User } from "../src/database/User/schema";

declare module 'express' {
  export interface Request {
    user?: User
  }
}