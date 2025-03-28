"use server";

import { apiClient } from "@/lib/client";
import { CreatePostInput } from "@server/types/post";
import { revalidatePath } from "next/cache";

export const createPost = async (data: CreatePostInput) => {
  const response = await apiClient.api.posts.$post({
    json: {
      title: data.title,
      body: data.body,
    },
  });
  revalidatePath("/");
  return await response.json();
};
