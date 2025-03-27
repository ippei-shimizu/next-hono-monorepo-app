import { Post } from "@server/types/post";
import Image from "next/image";
import Link from "next/link";

export default function PostLists({ posts }: { posts: Post[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          <span className="block">Latest Posts</span>
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="group">
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 w-full">
                  <Image src="https://placehold.jp/600x450.png" alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center">
                    <span className="ml-auto text-sm text-gray-500">
                      {new Date(post.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                    {post.title}
                  </h2>
                  <p className="mb-4 line-clamp-2 text-gray-600">{post.body || post.body?.substring(0, 120) + "..."}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
