/*
  Warnings:

  - You are about to drop the column `img` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "img",
ADD COLUMN     "imgList" TEXT[];
