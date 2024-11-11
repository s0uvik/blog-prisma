import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const PostsPage = async () => {
  // const post = await prisma.post.findMany({
  //   where: {
  //     title: {
  //       contains: "post",
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   take: 10,
  //   // skip: 10,
  // });

  const user = await prisma.user.findUnique({
    where: {
      email: "souvik@gmail.com",
    },
    include: {
      posts: true,
    },
  });

  const postCount = await prisma.post.count();

  return (
    <main className=" w-full h-screen flex flex-col gap-3 pt-16 items-center">
      <h1 className=" text-3xl font font-semibold">All Post ({postCount})</h1>
      <section className=" p-4">
        <ul>
          {user?.posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <li>{post.title}</li>
            </Link>
          ))}
        </ul>
      </section>
      <section className=" w-full">
        <form
          action={createPost}
          className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the title"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={5}
              className="mt-1 block w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the content"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default PostsPage;
