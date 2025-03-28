"use client";

import { createPost } from "@/services/createPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "@server/schemas/posts";
import { CreatePostInput } from "@server/types/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: CreatePostInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await createPost(data);

      if (result.success) {
        reset();
        router.push("/");
        router.refresh();
      } else {
        setServerError("投稿の作成に失敗しました");
      }
    } catch (err) {
      setServerError("予期せぬエラーが発生しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {serverError && <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700">{serverError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            タイトル
          </label>
          <input
            id="title"
            {...register("title")}
            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="投稿のタイトルを入力"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="body" className="mb-1 block text-sm font-medium text-gray-700">
            本文
          </label>
          <textarea
            id="body"
            {...register("body")}
            rows={8}
            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
              errors.body ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="投稿の内容を入力"
          />
          {errors.body && <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>}
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isSubmitting ? "送信中..." : "投稿を作成"}
          </button>
        </div>
      </form>
    </div>
  );
}
