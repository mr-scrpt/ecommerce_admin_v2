/*
  Warnings:

  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- DropTable
DROP TABLE "_CartToProduct";

-- CreateTable
CREATE TABLE "CartRow" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartRow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartRow" ADD CONSTRAINT "CartRow_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
