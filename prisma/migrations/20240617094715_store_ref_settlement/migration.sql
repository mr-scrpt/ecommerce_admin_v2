-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_settlementRef_fkey";

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_settlementRef_fkey" FOREIGN KEY ("settlementRef") REFERENCES "Settlement"("ref") ON DELETE CASCADE ON UPDATE CASCADE;
