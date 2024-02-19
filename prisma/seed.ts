import { PrismaClient } from "@prisma/client";
import { mapEnumToPrismaDatatype } from "../src/shared/type/mapOptionDatatype";
import { categoryListSeed } from "./data/category";
import { optionListSeed } from "./data/option";
import { optionItemListSeed } from "./data/optionItem";
import { productListSeed } from "./data/product";
import { userListSeed } from "./data/user";
const prisma = new PrismaClient();

async function main() {
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
    await prisma.option.create({
      data: { ...option, datatype: mapEnumToPrismaDatatype(option.datatype) },
    });
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
