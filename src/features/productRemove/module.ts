import { ProductRepository } from "@/entities/product/server";
import { Container, ContainerModule } from "inversify";
import { ProductRemoveTx } from "./_tx/productRemove.transaction";
import { RemoveProductComplexibleUseCase } from "./_useCase/productRemoveComplexible.usecase";

export const productRemoveContainer = new Container();

export const ProductRemoveModule = new ContainerModule((bind) => {
  bind(ProductRepository).toSelf();
  bind(ProductRemoveTx).toSelf();
  bind(RemoveProductComplexibleUseCase).toSelf();
});

productRemoveContainer.load(ProductRemoveModule);
