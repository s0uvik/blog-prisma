import React from "react";
import { unstable_cache as cache } from "next/cache";
import prisma from "@/lib/db";

type Params = {
  params: Promise<{
    post: string;
  }>;
};

const getCachePost = cache((postId) => {
  return prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
});

const PostPage = async ({ params }: Params) => {
  const postId = (await params).post;
  const post = await getCachePost(postId);
  return (
    <main className=" w-full h-screen flex flex-col gap-3 pt-16 items-center">
      <h1 className=" text-3xl font font-semibold">{post?.title}</h1>
      <section className=" p-4">
        <p>{post?.content}</p>
      </section>
    </main>
  );
};

export default PostPage;
