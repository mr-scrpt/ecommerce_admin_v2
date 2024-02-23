/*
  Warnings:

  - You are about to drop the `_OptionToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OptionToProduct" DROP CONSTRAINT "_OptionToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionToProduct" DROP CONSTRAINT "_OptionToProduct_B_fkey";

-- DropTable
DROP TABLE "_OptionToProduct";

-- CreateTable
CREATE TABLE "_OptionItemSelectedToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionItemSelectedToProduct_AB_unique" ON "_OptionItemSelectedToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionItemSelectedToProduct_B_index" ON "_OptionItemSelectedToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OptionItemSelectedToProduct" ADD CONSTRAINT "_OptionItemSelectedToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionItemSelectedToProduct" ADD CONSTRAINT "_OptionItemSelectedToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
