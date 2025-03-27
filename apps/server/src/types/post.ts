import { z } from "zod";
import {
  createPostSchema,
  getPostsSchema,
  getPostSchema,
} from "../schemas/posts";

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type GetPostsParams = z.infer<typeof getPostsSchema>;
export type GetPostParams = z.infer<typeof getPostSchema>;
