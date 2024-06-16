import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { ProductUpdateController } from "./_controller/productUpdate.controller";
import { IProductUpdateTx } from "./_domain/transaction.type";
import { ProductUpdateService } from "./_service/productUpdate.service";
import { ProductUpdateTx } from "./_tx/productUpdate.transaction";

export const ProductUpdateModule = new ContainerModule((bind) => {
  bind(IProductUpdateTx).to(ProductUpdateTx);

  bind(ProductUpdateService).toSelf();

  bind(Controller).to(ProductUpdateController);
  // bind(UpdateProductComplexibleUseCase).toSelf();
});
