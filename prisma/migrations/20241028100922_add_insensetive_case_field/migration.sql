/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "name" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "PropertyItem" ALTER COLUMN "name" SET DATA TYPE CITEXT;

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "name" SET DATA TYPE CITEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");
