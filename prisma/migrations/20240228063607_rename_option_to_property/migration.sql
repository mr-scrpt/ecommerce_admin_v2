/*
  Warnings:

  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OptionItemToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OptionToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OptionItem" DROP CONSTRAINT "OptionItem_optionId_fkey";

-- DropForeignKey
ALTER TABLE "_OptionItemToProduct" DROP CONSTRAINT "_OptionItemToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionItemToProduct" DROP CONSTRAINT "_OptionItemToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_OptionToCategory" DROP CONSTRAINT "_OptionToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionToCategory" DROP CONSTRAINT "_OptionToCategory_B_fkey";

-- DropTable
DROP TABLE "Option";

-- DropTable
DROP TABLE "OptionItem";

-- DropTable
DROP TABLE "_OptionItemToProduct";

-- DropTable
DROP TABLE "_OptionToCategory";

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "datatype" "DATATYPE" NOT NULL,
    "isFilter" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyItemToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "PropertyItem_propertyId_name_idx" ON "PropertyItem"("propertyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyItem_propertyId_name_key" ON "PropertyItem"("propertyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToCategory_AB_unique" ON "_PropertyToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToCategory_B_index" ON "_PropertyToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyItemToProduct_AB_unique" ON "_PropertyItemToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyItemToProduct_B_index" ON "_PropertyItemToProduct"("B");

-- AddForeignKey
ALTER TABLE "PropertyItem" ADD CONSTRAINT "PropertyItem_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToCategory" ADD CONSTRAINT "_PropertyToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToCategory" ADD CONSTRAINT "_PropertyToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyItemToProduct" ADD CONSTRAINT "_PropertyItemToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyItemToProduct" ADD CONSTRAINT "_PropertyItemToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
