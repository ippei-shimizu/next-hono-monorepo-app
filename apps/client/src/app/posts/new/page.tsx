import PostForm from "@/app/posts/_components/postForm";

export default function Page() {
  return (
    <div className="mx-auto my-12 max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">新規投稿の作成</h1>
      <PostForm />
    </div>
  );
}
