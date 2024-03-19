/*
  Warnings:

  - You are about to drop the column `productArticle` on the `CartRow` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `CartRow` table. All the data in the column will be lost.
  - Added the required column `productArticle` to the `OrderRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `OrderRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartRow" DROP COLUMN "productArticle",
DROP COLUMN "productName";

-- AlterTable
ALTER TABLE "OrderRow" ADD COLUMN     "productArticle" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL;
