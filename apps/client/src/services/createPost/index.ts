"use server";

import { apiClient } from "@/lib/client";
import { CreatePostInput } from "@server/types/post";

export const createPost = async (data: CreatePostInput) => {
  const response = await apiClient.api.posts.$post({
    json: {
      title: data.title,
      body: data.body,
    },
  });
  return await response.json();
};
