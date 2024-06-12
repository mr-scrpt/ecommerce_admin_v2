import { ContainerModule } from "inversify";
import { ProductUpdateTx } from "./_tx/productUpdate.transaction";
import { UpdateProductComplexibleUseCase } from "./_usecase/updateProductComplexible.usecase";

export const ProductUpdateModule = new ContainerModule((bind) => {
  bind(ProductUpdateTx).toSelf();
  // bind(UpdateProductComplexibleUseCase).toSelf();
});
