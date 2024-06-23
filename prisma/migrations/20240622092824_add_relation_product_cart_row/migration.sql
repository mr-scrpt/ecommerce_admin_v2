-- AddForeignKey
ALTER TABLE "CartRow" ADD CONSTRAINT "CartRow_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
