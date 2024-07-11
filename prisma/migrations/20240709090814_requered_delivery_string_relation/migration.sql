/*
  Warnings:

  - Added the required column `userId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Made the column `addressId` on table `Delivery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storeId` on table `Delivery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "addressId" SET NOT NULL,
ALTER COLUMN "storeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
