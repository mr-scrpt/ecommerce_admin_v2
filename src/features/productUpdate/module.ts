import { ProductRepository } from "@/entities/product/server";
import { Container, ContainerModule } from "inversify";
import { ProductUpdateTx } from "./_tx/productUpdate.transaction";
import { UpdateProductComplexibleUseCase } from "./_usecase/updateProductComplexible.usecase";

export const productUpdateContainer = new Container();

export const ProductUpdateModule = new ContainerModule((bind) => {
  bind(ProductRepository).toSelf();
  bind(ProductUpdateTx).toSelf();
  bind(UpdateProductComplexibleUseCase).toSelf();
});

productUpdateContainer.load(ProductUpdateModule);
