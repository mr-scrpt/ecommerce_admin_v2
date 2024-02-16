-- CreateEnum
CREATE TYPE "DATATYPE" AS ENUM ('select', 'mult', 'checkbox', 'radio');

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "datatype" "DATATYPE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OptionToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "OptionItem_optionId_name_idx" ON "OptionItem"("optionId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "OptionItem_optionId_name_key" ON "OptionItem"("optionId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToCategory_AB_unique" ON "_OptionToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToCategory_B_index" ON "_OptionToCategory"("B");

-- AddForeignKey
ALTER TABLE "OptionItem" ADD CONSTRAINT "OptionItem_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToCategory" ADD CONSTRAINT "_OptionToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToCategory" ADD CONSTRAINT "_OptionToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
