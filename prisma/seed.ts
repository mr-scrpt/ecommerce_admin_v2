import { PrismaClient } from "@prisma/client";
import { categoryListSeed } from "./data/category";
import { userListSeed } from "./data/user";
const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    ...userListSeed.map((data) => {
      console.log("user created", data);
      return prisma.user.create({ data });
    }),

    // Создаем массив промисов для категорий
    ...categoryListSeed.map((data) => {
      console.log("category created", data);
      return prisma.category.create({ data });
    }),
  ]);
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
