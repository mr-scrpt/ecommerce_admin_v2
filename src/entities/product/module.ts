import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { ProductController } from "./_controller/product.controller";
import { ProductRepository } from "./_repository/product.repo";
import { ProductGetService } from "./_service/productGet.service";
import { ProductRelationGetService } from "./_service/productRelationGet.service";
import { ProductListGetService } from "./_service/productListGet.service";
import { ProductListGetByIdListService } from "./_service/productListGetByIdList.service";
import { ProductListSearchService } from "./_service/productListSearch.service";
import { IProductRepository } from "@/kernel/domain/product/repository.type";

export const ProductModule = new ContainerModule((bind) => {
  bind(IProductRepository).to(ProductRepository);

  bind(ProductGetService).toSelf();
  bind(ProductRelationGetService).toSelf();
  bind(ProductListGetService).toSelf();
  bind(ProductListGetByIdListService).toSelf();
  bind(ProductListSearchService).toSelf();

  bind(Controller).to(ProductController);
});
