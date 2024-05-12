import { ProductRepository } from "@/entities/product/server";
import { Container, ContainerModule } from "inversify";
import { ProductCreateTx } from "./_tx/productCreate.transaction";
import { CreateProductComplexibleUseCase } from "./_usecase/productCreateComplexible.usecase";

export const productCreateContainer = new Container();

export const ProductCreateModule = new ContainerModule((bind) => {
  bind(ProductRepository).toSelf();
  bind(ProductCreateTx).toSelf();
  bind(CreateProductComplexibleUseCase).toSelf();
});

productCreateContainer.load(ProductCreateModule);
