/*
  Warnings:

  - You are about to drop the column `apartment` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `house` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "apartment",
DROP COLUMN "house",
DROP COLUMN "street",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "settlementRef" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "apartment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_settlementRef_fkey" FOREIGN KEY ("settlementRef") REFERENCES "Settlement"("ref") ON DELETE CASCADE ON UPDATE CASCADE;
