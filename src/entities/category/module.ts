import { ICategoryRepository } from "@/kernel/domain/category/repository.type";
import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { CategoryController } from "./_controller/category.controller";
import { CategoryRepository } from "./_repository/category.repo";
import { CategoryListGetService } from "./_service/categoryListGet.service";
import { CategoryRelationGetService } from "./_service/categoryRelationGet.service";
import { CategoryInvariant } from "./_domain/invariant.check";
import { ICategoryInvariant } from "@/kernel/domain/category/invariant.type";

export const CategoryModule = new ContainerModule((bind) => {
  bind(ICategoryRepository).to(CategoryRepository);
  bind(ICategoryInvariant).to(CategoryInvariant);

  bind(CategoryRelationGetService).toSelf();
  bind(CategoryListGetService).toSelf();

  bind(Controller).to(CategoryController);
});
