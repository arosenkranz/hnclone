import { prisma } from "~/server/db";
import users from "./users.json";

async function main() {
  const userPromises = users.map((user) => {
    return prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        posts: {
          create: user.posts,
        },
      },
    });
  });
  await Promise.all(userPromises);
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
