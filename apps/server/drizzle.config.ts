import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

try {
  dotenv.config({ path: "./.dev.vars" });
} catch (error) {
  console.log("No .dev.vars file found");
}

const SUPABASE_DATABASE_URL = process.env.SUPABASE_DATABASE_URL;

if (!SUPABASE_DATABASE_URL) {
  throw new Error("SUPABASE_DATABASE_URL環境変数が設定されていません");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: SUPABASE_DATABASE_URL,
  },
});
