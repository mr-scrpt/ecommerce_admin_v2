import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { ProductRepository } from "./_repository/product.repo";
import { GetProductUseCase } from "./_usecase/getProduct.usecase";
import { GetproductBySlugUseCase } from "./_usecase/getProductBySlug.usecase";
import { GetProductListUseCase } from "./_usecase/getProductList.usecase";
import { GetProductListByIdUseCase } from "./_usecase/getProductListById.usecase";
import { GetProductListSearchUseCase } from "./_usecase/getProductListSearch.usecase";
import { GetProductWithRelationUseCase } from "./_usecase/getProductWithRelation.usecase";

const productContainer = new Container();

export const ProductModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(ProductRepository).toSelf();
  bind(GetProductUseCase).toSelf();
  bind(GetproductBySlugUseCase).toSelf();
  bind(GetProductListUseCase).toSelf();
  bind(GetProductListByIdUseCase).toSelf();
  bind(GetProductListSearchUseCase).toSelf();
  bind(GetProductWithRelationUseCase).toSelf();
});

productContainer.load(ProductModule);

export default productContainer;
