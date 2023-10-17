import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './Schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export class DrizzleProvider {
  private static drizzleInstance: NodePgDatabase<typeof schema>;

  public static getInstance() {
    if (!this.drizzleInstance) {
      this.drizzleInstance = drizzle(pool, { schema });
    }

    return this.drizzleInstance;
  }
}
