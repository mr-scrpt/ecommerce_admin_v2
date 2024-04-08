import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CartRowChangeQuantityTx } from "./_tx/cartRowChangeQuantity.transaction";
import { ChangeQuantityCartRowUseCase } from "./_usecase/cartRowChangeQuantity.usecase";

const cartRowChangeQuantityContainer = new Container();

export const CartRowChangeQuantityModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CartRowChangeQuantityTx).toSelf();
  bind(CartRepository).toSelf();
  bind(CartRowRepository).toSelf();
  bind(ChangeQuantityCartRowUseCase).toSelf();
});

cartRowChangeQuantityContainer.load(CartRowChangeQuantityModule);

export default cartRowChangeQuantityContainer;
