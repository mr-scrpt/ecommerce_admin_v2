/*
  Warnings:

  - You are about to drop the column `deliveryType` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `deliveryTypeId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "deliveryType",
ADD COLUMN     "deliveryTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DeliveryType" (
    "id" TEXT NOT NULL,
    "type" "DELIVERY_TYPE" NOT NULL,

    CONSTRAINT "DeliveryType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_deliveryTypeId_fkey" FOREIGN KEY ("deliveryTypeId") REFERENCES "DeliveryType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
