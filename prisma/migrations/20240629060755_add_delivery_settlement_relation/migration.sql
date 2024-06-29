/*
  Warnings:

  - You are about to drop the column `settlement` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `settlementRef` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "settlement",
ADD COLUMN     "settlementRef" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_settlementRef_fkey" FOREIGN KEY ("settlementRef") REFERENCES "Settlement"("ref") ON DELETE CASCADE ON UPDATE CASCADE;
