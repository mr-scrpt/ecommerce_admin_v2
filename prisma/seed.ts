import { PrismaClient } from "@prisma/client";
import { categoryListSeed } from "./data/category";
import { categoryRelationsSeed } from "./data/categoryRelations";
import { productListSeed } from "./data/product";
import { propertyListSeed } from "./data/property";
import { propertyItemListSeed } from "./data/propertyItem";
import { userListSeed } from "./data/user";
import { productRelationsSeed } from "./data/productRelations";
import { mapEnumToPrismaDatatype } from "../src/shared/lib/prisma";

const prisma = new PrismaClient();

async function main() {
  for await (const user of userListSeed) {
    await prisma.user.create({ data: user });
    console.log("user created", user);
  }

  for await (const property of propertyListSeed) {
    await prisma.property.create({
      data: {
        ...property,
        datatype: mapEnumToPrismaDatatype(property.datatype),
      },
    });
    console.log("property created", property);
  }

  for await (const propertyItem of propertyItemListSeed) {
    await prisma.propertyItem.create({ data: propertyItem });
    console.log("property item created", propertyItem);
  }

  for await (const category of categoryListSeed) {
    await prisma.category.create({ data: category });
    console.log("category created", category);
  }

  for await (const product of productListSeed) {
    await prisma.product.create({ data: product });
    console.log("product created", product);
  }

  // Relation
  for await (const category of categoryRelationsSeed) {
    await prisma.category.update({
      where: { id: category.id },
      data: category,
    });
    console.log("category created relation", category);
  }

  for await (const product of productRelationsSeed) {
    await prisma.product.update({ where: { id: product.id }, data: product });
    console.log("product created relation", product);
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
