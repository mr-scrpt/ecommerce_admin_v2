import "reflect-metadata";

import productContainer from "../module";
import { GetProductUseCase } from "./getProduct.usecase";
import { GetproductBySlugUseCase } from "./getProductBySlug.usecase";
import { GetProductListUseCase } from "./getProductList.usecase";
import { GetProductListByIdUseCase } from "./getProductListById.usecase";
import { GetProductListSearchUseCase } from "./getProductListSearch.usecase";
import { GetProductWithRelationUseCase } from "./getProductWithRelation.usecase";

export const getProductUseCase = productContainer.get(GetProductUseCase);
export const getProductBySlugUseCase = productContainer.get(
  GetproductBySlugUseCase,
);
export const getProductListUseCase = productContainer.get(
  GetProductListUseCase,
);
export const getProductListByIdUseCase = productContainer.get(
  GetProductListByIdUseCase,
);
export const getProductListSearchUseCase = productContainer.get(
  GetProductListSearchUseCase,
);
export const getProductWithRelationUseCase = productContainer.get(
  GetProductWithRelationUseCase,
);
