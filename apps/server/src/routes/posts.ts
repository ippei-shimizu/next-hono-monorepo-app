import { Hono } from "hono";
import { createClient, Env } from "../db/client";
import { zValidator } from "@hono/zod-validator";
import { getPostsSchema } from "../schemas/posts";
import { posts } from "../db/schema";

export const postsRouter = new Hono<{ Bindings: Env }>();

postsRouter.get("/", zValidator("query", getPostsSchema), async (c) => {
  const { limit, offset } = c.req.valid("query");
  const db = createClient({
    SUPABASE_DATABASE_URL: c.env.SUPABASE_DATABASE_URL,
  });
  const allPosts = await db.select().from(posts).limit(limit).offset(offset);

  return c.json({
    success: true,
    data: allPosts,
  });
});
