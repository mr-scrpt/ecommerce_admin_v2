/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `DeliveryType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `DeliveryType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryType_type_key" ON "DeliveryType"("type");
