import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { CartRowCreateController } from "./_controller/cartRowCreate.controller";
import { CartRowCreateTx } from "./_tx/cartRowCreate.transaction";
import { CartRowCreateService } from "./_service/cartRowCreate.service";
import { ICartRowCreateTx } from "./_domain/transaction.type";

export const CartRowAddModule = new ContainerModule((bind) => {
  bind(ICartRowCreateTx).to(CartRowCreateTx);

  bind(CartRowCreateService).toSelf();
  bind(Controller).to(CartRowCreateController);
});
