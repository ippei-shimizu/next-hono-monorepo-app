import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export interface Env {
  SUPABASE_DATABASE_URL: string;
}

export function createClient(env: Env) {
  const connectionString = env.SUPABASE_DATABASE_URL;

  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
  });

  return drizzle(client);
}
