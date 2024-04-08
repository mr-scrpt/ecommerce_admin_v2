import { ProductRepository } from "@/entities/product/server";
import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { ProductCreateTx } from "./_tx/productCreate.transaction";
import { CreateProductComplexibleUseCase } from "./_usecase/productCreateComplexible.usecase";

const productCreateContainer = new Container();

export const ProductCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(ProductRepository).toSelf();
  bind(ProductCreateTx).toSelf();
  bind(CreateProductComplexibleUseCase).toSelf();
});

productCreateContainer.load(ProductCreateModule);

export default productCreateContainer;
