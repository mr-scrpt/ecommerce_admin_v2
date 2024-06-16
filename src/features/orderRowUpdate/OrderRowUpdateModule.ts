import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { ProductUpdateService } from "../productUpdate/_service/productUpdate.service";
import { OrderRowUpdateController } from "./_controller/orderRowUpdate.controller";
import { IOrderRowUpdateTx } from "./_domain/transaction.type";
import { OrderRowUpdateTx } from "./_tx/orderRowUpdate.transaction";

export const OrderRowUpdateModule = new ContainerModule((bind) => {
  bind(IOrderRowUpdateTx).to(OrderRowUpdateTx);

  bind(ProductUpdateService).toSelf();

  bind(Controller).to(OrderRowUpdateController);
});
