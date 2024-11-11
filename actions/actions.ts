"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPost = async (formDate: FormData) => {
  try {
    await prisma.post.create({
      data: {
        title: formDate.get("title") as string,
        content: formDate.get("content") as string,
        author: {
          connect: {
            email: "souvik@gmail.com",
          },
        },
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("Field already exists");
      }
    }
  }
};

export const editPost = async (formDate: FormData, id: string) => {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formDate.get("title") as string,
      content: formDate.get("content") as string,
    },
  });
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};
