-- CreateTable
CREATE TABLE "_OptionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToProduct_AB_unique" ON "_OptionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToProduct_B_index" ON "_OptionToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OptionToProduct" ADD CONSTRAINT "_OptionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToProduct" ADD CONSTRAINT "_OptionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
