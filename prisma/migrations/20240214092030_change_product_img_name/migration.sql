/*
  Warnings:

  - You are about to drop the column `board` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "board",
ADD COLUMN     "img" TEXT[];
