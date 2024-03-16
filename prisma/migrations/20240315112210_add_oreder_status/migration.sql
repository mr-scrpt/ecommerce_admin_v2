/*
  Warnings:

  - Added the required column `orderStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderStatus" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL;
