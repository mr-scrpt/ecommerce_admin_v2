import { ContainerModule } from "inversify";
import { CartRowRemoveService } from "./_service/cartRowRemove.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { CartRowRemoveController } from "./_controller/cartRowRemove.controller";
import { CartRowRemoveTx } from "./_tx/cartRowRemove.transaction";

export const CartRowRemoveModule = new ContainerModule((bind) => {
  bind(CartRowRemoveTx).toSelf();

  bind(CartRowRemoveService).toSelf();
  bind(Controller).to(CartRowRemoveController);
});
