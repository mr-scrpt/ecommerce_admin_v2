import { ContainerModule } from "inversify";
import { CartController } from "./_controller/cart.controller";
import { CartRepository } from "./_repository/cart.repo";
import { CartRowRepository } from "./_repository/cartRow.repo";
import { CartRelationGetService } from "./_service/cartGet.service";
import { Controller } from "@/kernel/lib/trpc/server";
import {
  ICartRepository,
  ICartRowRepository,
} from "@/kernel/domain/cart/repository.type";

export const CartModule = new ContainerModule((bind) => {
  bind(ICartRepository).to(CartRepository);
  bind(ICartRowRepository).to(CartRowRepository);
  bind(CartRelationGetService).toSelf();

  bind(Controller).to(CartController);
});
