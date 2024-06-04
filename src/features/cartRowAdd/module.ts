import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { CartRowAddController } from "./_controller/cartRowAdd.controller";
import { CartRowAddService } from "./_service/cartRowAdd.service";
import { CartRowAddTx } from "./_tx/cartRowAdd.transaction";

export const CartRowAddModule = new ContainerModule((bind) => {
  bind(CartRowAddTx).toSelf();

  bind(CartRowAddService).toSelf();
  bind(Controller).to(CartRowAddController);
});
