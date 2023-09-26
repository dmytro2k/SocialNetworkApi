import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export class DrizzleProvider {
  private static drizzleInstance: NodePgDatabase<Record<string, never>>;

  public static getInstance() {
    if (!this.drizzleInstance) {
      this.drizzleInstance = drizzle(pool);
    }

    return this.drizzleInstance;
  }
}