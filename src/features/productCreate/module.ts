import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { ProductCreateController } from "./_controller/productCreate.controller";
import { IProductCreateTx } from "./_domain/transaction.type";
import { ProductCreateService } from "./_service/productCreate.service";
import { ProductCreateTx } from "./_tx/productCreate.transaction";

export const ProductCreateModule = new ContainerModule((bind) => {
  bind(IProductCreateTx).to(ProductCreateTx);

  bind(ProductCreateService).toSelf();

  bind(Controller).to(ProductCreateController);
});
