import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPost: Prisma.PostCreateInput[] = [
  {
    title: "First Post",
    content: "This is the first post",
    author: {
      connectOrCreate: {
        where: { email: "souvik@gmail.com" },
        create: {
          email: "souvik@gmail.com",
          hashedPassword: "hfsdjfhjskdfhjsd",
        },
      },
    },
  },
];
console.log(initialPost);
async function main() {
  for (const post of initialPost) {
    await prisma.post.create({ data: post });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
