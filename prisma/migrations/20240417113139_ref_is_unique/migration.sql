/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `Settlement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Settlement_ref_key" ON "Settlement"("ref");
