import { apiClient } from "@/lib/client";

export const getPosts = async (limit: string, offset: string) => {
  const response = await apiClient.api.posts.$get({
    query: {
      limit: limit,
      offset: offset,
    },
  });
  return await response.json();
};
