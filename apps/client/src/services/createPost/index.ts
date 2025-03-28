"use server";

import { API_BASE_URL } from "@/lib/client";
import { AppType } from "@server/index";
import { CreatePostInput } from "@server/types/post";
import { hc } from "hono/client";

export const createPost = async (data: CreatePostInput) => {
  const apiClient = hc<AppType>(API_BASE_URL);
  const response = await apiClient.api.posts.$post({
    json: {
      title: data.title,
      body: data.body,
    },
  });
  return await response.json();
};
