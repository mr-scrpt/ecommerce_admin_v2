import { ProductRepository } from "@/entities/product/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { ProductUpdateTx } from "./_tx/productUpdate.transaction";
import { UpdateProductComplexibleUseCase } from "./_usecase/updateProductComplexible.usecase";

const productCreateContainer = new Container();

export const ProductCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(ProductRepository).toSelf();
  bind(ProductUpdateTx).toSelf();
  bind(UpdateProductComplexibleUseCase).toSelf();
});

productCreateContainer.load(ProductCreateModule);

export default productCreateContainer;
