import { Container, ContainerModule } from "inversify";
import { CartRowRemoveProductTx } from "./_tx/cartRowRemove.transaction";
import { RemoveCartRowUseCase } from "./_usecase/cartRowRemove.usecase";

export const cartRowRemoveContainer = new Container();

export const CartRowRemoveModule = new ContainerModule((bind) => {
  bind(CartRowRemoveProductTx).toSelf();

  bind(RemoveCartRowUseCase).toSelf();
});

cartRowRemoveContainer.load(CartRowRemoveModule);
