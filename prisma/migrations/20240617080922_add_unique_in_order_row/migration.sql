/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderRow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderRow_orderId_productId_key" ON "OrderRow"("orderId", "productId");
