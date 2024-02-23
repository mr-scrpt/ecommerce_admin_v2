/*
  Warnings:

  - You are about to drop the `_OptionItemSelectedToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isFilter` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OptionItemSelectedToProduct" DROP CONSTRAINT "_OptionItemSelectedToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionItemSelectedToProduct" DROP CONSTRAINT "_OptionItemSelectedToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "isFilter" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "_OptionItemSelectedToProduct";

-- CreateTable
CREATE TABLE "_OptionItemToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionItemToProduct_AB_unique" ON "_OptionItemToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionItemToProduct_B_index" ON "_OptionItemToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OptionItemToProduct" ADD CONSTRAINT "_OptionItemToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionItemToProduct" ADD CONSTRAINT "_OptionItemToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
