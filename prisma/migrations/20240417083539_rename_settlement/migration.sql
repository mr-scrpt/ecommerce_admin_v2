/*
  Warnings:

  - You are about to drop the `Settle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Settle";

-- CreateTable
CREATE TABLE "Settlement" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "settlementType" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionRu" TEXT NOT NULL,
    "descriptionTranslit" TEXT NOT NULL,
    "settlementTypeDescription" TEXT NOT NULL,
    "settlementTypeDescriptionRu" TEXT NOT NULL,
    "settlementTypeDescriptionTranslit" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "regionsDescription" TEXT NOT NULL,
    "regionsDescriptionRu" TEXT NOT NULL,
    "regionsDescriptionTranslit" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "areaDescription" TEXT NOT NULL,
    "areaDescriptionRu" TEXT NOT NULL,
    "areaDescriptionTranslit" TEXT NOT NULL,
    "index1" TEXT NOT NULL,
    "index2" TEXT NOT NULL,
    "indexCOATSU1" TEXT NOT NULL,
    "delivery1" TEXT NOT NULL,
    "delivery2" TEXT NOT NULL,
    "delivery3" TEXT NOT NULL,
    "delivery4" TEXT NOT NULL,
    "delivery5" TEXT NOT NULL,
    "delivery6" TEXT NOT NULL,
    "delivery7" TEXT NOT NULL,
    "specialCashCheck" INTEGER NOT NULL,
    "radiusHomeDelivery" TEXT NOT NULL,
    "radiusExpressPickUp" TEXT NOT NULL,
    "radiusDrop" TEXT NOT NULL,
    "warehouse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);
