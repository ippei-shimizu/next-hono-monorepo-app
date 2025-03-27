import PostLists from "@/app/posts/_components/postLists";
import { getPosts } from "@/services/getPosts";
import { Suspense } from "react";

export default async function Home() {
  const posts = await getPosts("10", "0");

  return (
    <div>
      {posts.data.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold underline">No Posts Available</h1>
          <p className="mt-4">Please check back later.</p>
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <PostLists posts={posts.data} />
        </Suspense>
      )}
    </div>
  );
}

