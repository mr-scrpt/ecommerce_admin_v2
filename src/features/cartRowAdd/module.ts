import { CartRepository, CartRowRepository } from "@/entities/cart/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CartRowAddTx } from "./_tx/cartRowAdd.transaction";
import { AddCartRowUseCase } from "./_usecase/cartAdd.usecase";

const cartAddContainer = new Container();

export const CartAddModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CartRowAddTx).toSelf();
  bind(CartRepository).toSelf();
  bind(CartRowRepository).toSelf();
  bind(AddCartRowUseCase).toSelf();
});

cartAddContainer.load(CartAddModule);

export default cartAddContainer;
