import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { Container, ContainerModule } from "inversify";
import { CartRowChangeQuantityTx } from "./_tx/cartRowChangeQuantity.transaction";
import { ChangeQuantityCartRowUseCase } from "./_usecase/cartRowChangeQuantity.usecase";

export const cartRowChangeQuantityContainer = new Container();

export const CartRowChangeQuantityModule = new ContainerModule((bind) => {
  bind(CartRowChangeQuantityTx).toSelf();
  bind(CartRepository).toSelf();
  bind(CartRowRepository).toSelf();
  bind(ChangeQuantityCartRowUseCase).toSelf();
});

cartRowChangeQuantityContainer.load(CartRowChangeQuantityModule);
