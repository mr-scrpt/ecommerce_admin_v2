/*
  Warnings:

  - You are about to drop the column `pickupPoint` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `storeRef` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "pickupPoint",
ADD COLUMN     "storeRef" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_storeRef_fkey" FOREIGN KEY ("storeRef") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
