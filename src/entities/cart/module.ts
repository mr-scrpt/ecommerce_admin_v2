import { ContainerModule } from "inversify";
import { CartController } from "./_controller/cart.controller";
import { CartRepository } from "./_repository/cart.repo";
import { CartRowRepository } from "./_repository/cartRow.repo";
import { CartGetService } from "./_service/cartGet.service";
import { Controller } from "@/kernel/lib/trpc/server";

export const CartModule = new ContainerModule((bind) => {
  bind(CartRepository).toSelf();
  bind(CartRowRepository).toSelf();
  bind(CartGetService).toSelf();
  bind(Controller).to(CartController);
});
