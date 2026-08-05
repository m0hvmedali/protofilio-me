import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

declare global {
  var _postgresPool: Pool | undefined;
}

export const createPool = () => {
  if (!global._postgresPool) {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set. Database queries will fail.");
    }
    global._postgresPool = new Pool({
      connectionString: process.env.DATABASE_URL || "postgres://invalid:invalid@localhost/invalid", // Prevent attempting to connect to localhost with current user
    });
  }
  return global._postgresPool;
};

export const pool = createPool();

// Using schema for Drizzle relation mapping and type-safety
export const db = drizzle(pool, { schema });
