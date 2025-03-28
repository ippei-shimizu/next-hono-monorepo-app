import PostLists from "@/app/posts/_components/postLists";
import { getPosts } from "@/services/getPosts";
import Link from "next/link";
import { Suspense } from "react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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
        <>
          <div className="flex justify-end px-4 pt-4">
            <Link href="/posts/new">
              <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                新規投稿を作成
              </button>
            </Link>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <PostLists posts={posts.data} />
          </Suspense>
        </>
      )}
    </div>
  );
}
