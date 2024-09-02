/*
  Warnings:

  - You are about to drop the column `productArticle` on the `OrderRow` table. All the data in the column will be lost.
  - You are about to drop the column `productImg` on the `OrderRow` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `OrderRow` table. All the data in the column will be lost.
  - Added the required column `priceFixed` to the `OrderRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderRow" DROP COLUMN "productArticle",
DROP COLUMN "productImg",
DROP COLUMN "productName",
ADD COLUMN     "priceFixed" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderRow" ADD CONSTRAINT "OrderRow_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
