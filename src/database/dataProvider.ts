import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as users from './User/schema'
import * as posts from './Post/schema'
import * as likes from './Like/schema'
import * as comments from "./Comments/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

type mySchemas = typeof users & typeof posts & typeof likes & typeof comments
const schema: mySchemas = { ...users, ...posts, ...likes, ...comments }

export class DrizzleProvider {
  private static drizzleInstance: NodePgDatabase<mySchemas>;

  public static getInstance() {
    if (!this.drizzleInstance) {
      this.drizzleInstance = drizzle(pool, { schema });
    }

    return this.drizzleInstance;
  }
}