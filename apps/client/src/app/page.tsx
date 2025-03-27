import PostLists from "@/app/posts/_components/postLists";
import { getPosts } from "@/services/getPosts";
import { Suspense } from "react";

export default async function Home() {
  const posts = await getPosts("10", "0");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostLists posts={posts.data} />
      </Suspense>
    </div>
  );
}
