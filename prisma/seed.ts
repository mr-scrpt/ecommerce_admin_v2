import { PrismaClient } from "@prisma/client";
import { categoryListSeed } from "./data/category";
import { userListSeed } from "./data/user";
import { productListSeed } from "./data/product";
import { optionListSeed } from "./data/option";
import { optionItemListSeed } from "./data/optionItem";
const prisma = new PrismaClient();

async function main() {
  // await Promise.all([
  //   ...userListSeed.map((data) => {
  //     console.log("user created", data);
  //     return prisma.user.create({ data });
  //   }),
  //
  //   ...categoryListSeed.map((data) => {
  //     console.log("category created", data);
  //     return prisma.category.create({ data });
  //   }),
  //
  //   ...productListSeed.map((data) => {
  //     console.log("product created", data);
  //     return prisma.product.create({ data });
  //   }),
  //
  //   ...optionListSeed.map((data) => {
  //     console.log("option created", data);
  //     return prisma.option.create({ data });
  //   }),
  //
  //   ...optionItemListSeed.map((data) => {
  //     console.log("optionList created", data);
  //     return prisma.optionItem.create({ data });
  //   }),
  // ]);
  for await (const user of userListSeed) {
    await prisma.user.create({ data: user });
    console.log("user created", user);
  }

  for await (const category of categoryListSeed) {
    await prisma.category.create({ data: category });
    console.log("category created", category);
  }

  for await (const product of productListSeed) {
    await prisma.product.create({ data: product });
    console.log("product created", product);
  }

  for await (const option of optionListSeed) {
    await prisma.option.create({ data: option });
    console.log("option created", option);
  }

  for await (const optionItem of optionItemListSeed) {
    await prisma.optionItem.create({ data: optionItem });
    console.log("option item created", optionItem);
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
