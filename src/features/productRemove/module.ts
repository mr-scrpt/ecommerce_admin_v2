import { ContainerModule } from "inversify";
import { ProductRemoveTx } from "./_tx/productRemove.transaction";

export const ProductRemoveModule = new ContainerModule((bind) => {
  bind(ProductRemoveTx).toSelf();
  // bind(RemoveProductComplexibleUseCase).toSelf();
});
