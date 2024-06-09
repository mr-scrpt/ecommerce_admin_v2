import { ContainerModule } from "inversify";
import { CartRowRemoveService } from "./_service/cartRowRemove.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { CartRowRemoveController } from "./_controller/cartRowRemove.controller";
import { CartRowRemoveTx } from "./_tx/cartRowRemove.transaction";
import { ICartRowRemoveTx } from "./_domain/transaction.type";

export const CartRowRemoveModule = new ContainerModule((bind) => {
  bind(ICartRowRemoveTx).to(CartRowRemoveTx);

  bind(CartRowRemoveService).toSelf();
  bind(Controller).to(CartRowRemoveController);
});
