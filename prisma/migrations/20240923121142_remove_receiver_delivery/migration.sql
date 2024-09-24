/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Delivery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_receiverId_fkey";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "receiverId";
