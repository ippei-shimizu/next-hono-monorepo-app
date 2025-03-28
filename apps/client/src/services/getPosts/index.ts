import { API_BASE_URL } from "@/lib/client";
import { AppType } from "@server/index";
import { hc } from "hono/client";

export const getPosts = async (limit: string, offset: string) => {
  const apiClient = hc<AppType>(API_BASE_URL);
  const response = await apiClient.api.posts.$get({
    query: {
      limit: limit,
      offset: offset,
    },
  });
  return await response.json();
};
