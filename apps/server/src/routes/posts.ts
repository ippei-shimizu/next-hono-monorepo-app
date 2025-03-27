import { Hono } from "hono";
import { createClient, Env } from "../db/client";
import { zValidator } from "@hono/zod-validator";
import { createPostSchema, getPostsSchema } from "../schemas/posts";
import { posts } from "../db/schema";

export const postsRouter = new Hono<{ Bindings: Env }>()
  .get("/", zValidator("query", getPostsSchema), async (c) => {
    const { limit, offset } = c.req.valid("query");
    const db = createClient({
      SUPABASE_DATABASE_URL: c.env.SUPABASE_DATABASE_URL,
    });
    const allPosts = await db.select().from(posts).limit(limit).offset(offset);

    return c.json({
      success: true,
      data: allPosts,
    });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const postData = c.req.valid("json");
    const db = createClient({
      SUPABASE_DATABASE_URL: c.env.SUPABASE_DATABASE_URL,
    });
    const newPost = await db
      .insert(posts)
      .values({
        title: postData.title,
        body: postData.body,
      })
      .returning();

    return c.json({
      success: true,
      data: newPost,
    });
  });
