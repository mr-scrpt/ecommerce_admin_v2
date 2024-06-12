import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { ProductController } from "./_controller/product.controller";
import { IProductRepository } from "./_domain/repository.type";
import { ProductRepository } from "./_repository/product.repo";
import { ProductGetService } from "./_service/productGet.service";
import { ProductRelationGetService } from "./_service/productRelationGet.service";
import { ProductListGetService } from "./_service/productListGet.service";

export const ProductModule = new ContainerModule((bind) => {
  bind(IProductRepository).to(ProductRepository);

  bind(ProductGetService).toSelf();
  bind(ProductRelationGetService).toSelf();
  bind(ProductListGetService).toSelf();

  bind(Controller).to(ProductController);
});
