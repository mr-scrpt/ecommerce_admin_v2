import { Container, ContainerModule } from "inversify";
import { CartRowAddTx } from "./_tx/cartRowAdd.transaction";
import { AddCartRowUseCase } from "./_usecase/cartAdd.usecase";

export const cartAddContainer = new Container();

export const CartAddModule = new ContainerModule((bind) => {
  bind(CartRowAddTx).toSelf();

  bind(AddCartRowUseCase).toSelf();
});

cartAddContainer.load(CartAddModule);
