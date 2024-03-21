/*
  Warnings:

  - Added the required column `productImg` to the `OrderRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderRow" ADD COLUMN     "productImg" TEXT NOT NULL;
