/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `CartRow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartRow_cartId_productId_key" ON "CartRow"("cartId", "productId");
