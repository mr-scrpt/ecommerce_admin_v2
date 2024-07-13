/*
  Warnings:

  - Added the required column `receiverId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Receiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
