import { ProductRepository } from "@/entities/product/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { ProductRemoveTx } from "./_tx/productRemove.transaction";
import { RemoveProductComplexibleUseCase } from "./_useCase/productRemoveComplexible.usecase";

const productCreateContainer = new Container();

export const ProductCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(ProductRepository).toSelf();
  bind(ProductRemoveTx).toSelf();
  bind(RemoveProductComplexibleUseCase).toSelf();
});

productCreateContainer.load(ProductCreateModule);

export default productCreateContainer;
