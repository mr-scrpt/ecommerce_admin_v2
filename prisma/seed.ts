import { PrismaClient } from "@prisma/client";
import { ADMIN, USER, USER_2 } from "../tests/stabs/users";
import { CATEGORY, CATEGORY2, CATEGORY3 } from "../tests/stabs/category";
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      id: ADMIN.id,
      email: ADMIN.email,
      role: ADMIN.role,
      name: ADMIN.name,
      emailVerified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  });

  const user = await prisma.user.create({
    data: {
      id: USER.id,
      email: USER.email,
      role: USER.role,
      emailVerified: new Date().toISOString(),
      createdAt: new Date(Date.now() + 5000 * 1000 * 24).toISOString(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: USER_2.id,
      email: USER_2.email,
      role: USER_2.role,
      emailVerified: new Date().toISOString(),
      createdAt: new Date(Date.now() + 51000 * 1000 * 24).toISOString(),
    },
  });

  const category = await prisma.category.create({
    data: {
      id: CATEGORY.id,
      name: CATEGORY.name,
      slug: CATEGORY.slug,
      board: CATEGORY.board,

      createdAt: new Date().toISOString(),
    },
  });
  const category2 = await prisma.category.create({
    data: {
      id: CATEGORY2.id,
      name: CATEGORY2.name,
      slug: CATEGORY2.slug,
      board: CATEGORY2.board,

      createdAt: new Date(Date.now() + 35000 * 400 * 24).toISOString(),
    },
  });
  const category3 = await prisma.category.create({
    data: {
      id: CATEGORY3.id,
      name: CATEGORY3.name,
      slug: CATEGORY3.slug,
      board: CATEGORY3.board,
      createdAt: new Date(Date.now() + 51000 * 1200 * 24).toISOString(),
    },
  });

  console.log({ adminUser, user, user2 });
  console.log({ category, category2, category3 });
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
