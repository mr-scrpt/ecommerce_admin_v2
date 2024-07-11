/*
  Warnings:

  - You are about to drop the column `storeRef` on the `Delivery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_storeRef_fkey";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "storeRef",
ADD COLUMN     "storeId" TEXT;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
