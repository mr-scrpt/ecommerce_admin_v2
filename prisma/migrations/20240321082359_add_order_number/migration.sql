/*
  Warnings:

  - Added the required column `orderNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceTotal` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNo" TEXT NOT NULL,
ADD COLUMN     "priceTotal" DOUBLE PRECISION NOT NULL;
