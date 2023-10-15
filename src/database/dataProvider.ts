import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as users from './User/schema';
import * as posts from './Post/schema';
import * as likes from './Like/schema';
import * as comments from './Comment/schema';
import * as images from './Image/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const schema = { ...users, ...posts, ...likes, ...comments, ...images };

export class DrizzleProvider {
  private static drizzleInstance: NodePgDatabase<typeof schema>;

  public static getInstance() {
    if (!this.drizzleInstance) {
      this.drizzleInstance = drizzle(pool, { schema });
    }

    return this.drizzleInstance;
  }
}
