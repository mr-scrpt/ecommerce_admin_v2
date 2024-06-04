import { ContainerModule } from "inversify";
import { CartRowUpdateTx } from "./_tx/cartRowUpdate.transaction";
import { CartRowUpdateService } from "./_service/cartRowUpdate.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { CartRowUpdateController } from "./_controller/cartRowUpdate.controller";

export const CartRowUpdateModule = new ContainerModule((bind) => {
  bind(CartRowUpdateTx).toSelf();

  bind(CartRowUpdateService).toSelf();
  bind(Controller).to(CartRowUpdateController);
});
