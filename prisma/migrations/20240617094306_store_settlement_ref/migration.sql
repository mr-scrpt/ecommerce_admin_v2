/*
  Warnings:

  - You are about to drop the column `settlement` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[settlementRef]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `settlementRef` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "settlement",
ADD COLUMN     "settlementRef" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_settlementRef_key" ON "Store"("settlementRef");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_settlementRef_fkey" FOREIGN KEY ("settlementRef") REFERENCES "Settlement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
