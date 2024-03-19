/*
  Warnings:

  - Added the required column `productArcticle` to the `CartRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `CartRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `article` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartRow" ADD COLUMN     "productArcticle" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "article" TEXT NOT NULL;
