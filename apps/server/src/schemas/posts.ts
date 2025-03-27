import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1).max(255),
  body: z.string().min(1),
});

export const createPostSchema = postSchema;

export const getPostsSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10)),
  offset: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 0)),
});

export const getPostSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});
