import { PrismaClient } from "@prisma/client";
import { categoryListSeed } from "./data/category";
import { userListSeed } from "./data/user";
import { productListSeed } from "./data/product";
const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    ...userListSeed.map((data) => {
      console.log("user created", data);
      return prisma.user.create({ data });
    }),

    ...categoryListSeed.map((data) => {
      console.log("category created", data);
      return prisma.category.create({ data });
    }),

    ...productListSeed.map((data) => {
      console.log("product created", data);
      return prisma.product.create({ data });
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
