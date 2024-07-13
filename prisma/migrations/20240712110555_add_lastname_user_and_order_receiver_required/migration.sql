/*
  Warnings:

  - Made the column `receiverId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_receiverId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "receiverId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastName" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Receiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
