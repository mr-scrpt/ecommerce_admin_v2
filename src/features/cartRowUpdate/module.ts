import { ContainerModule } from "inversify";
import { CartRowUpdateTx } from "./_tx/cartRowUpdate.transaction";
import { CartRowUpdateService } from "./_service/cartRowUpdate.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { CartRowUpdateController } from "./_controller/cartRowUpdate.controller";
import { ICartRowUpdateTx } from "./_domain/transaction.type";

export const CartRowUpdateModule = new ContainerModule((bind) => {
  bind(ICartRowUpdateTx).to(CartRowUpdateTx);

  bind(CartRowUpdateService).toSelf();
  bind(Controller).to(CartRowUpdateController);
});
