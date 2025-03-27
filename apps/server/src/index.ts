import { Hono } from "hono";
import { Env } from "./db/client";
import { cors } from "hono/cors";
import { postsRouter } from "./routes/posts";

const app = new Hono<{ Bindings: Env }>()
  .use(
    "/*",
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Type"],
      maxAge: 864_000,
      credentials: true,
    }),
  )
  .route("/api/posts", postsRouter);

export default app;
export type AppType = typeof app;
