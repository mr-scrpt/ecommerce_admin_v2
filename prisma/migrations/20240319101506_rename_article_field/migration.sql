/*
  Warnings:

  - You are about to drop the column `productArcticle` on the `CartRow` table. All the data in the column will be lost.
  - Added the required column `productArticle` to the `CartRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartRow" DROP COLUMN "productArcticle",
ADD COLUMN     "productArticle" TEXT NOT NULL;
