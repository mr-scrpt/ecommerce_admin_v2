import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { CategoryController } from "./_controller/category.controller";
import { ICategoryRepository } from "./_domain/repository.type";
import { CategoryRepository } from "./_repository/category.repo";
import { CategoryListGetService } from "./_service/categoryListGet.service";
import { CategoryRelationGetService } from "./_service/categoryRelationGet.service";

export const CategoryModule = new ContainerModule((bind) => {
  bind(ICategoryRepository).to(CategoryRepository);
  bind(CategoryRelationGetService).toSelf();
  bind(CategoryListGetService).toSelf();

  bind(Controller).to(CategoryController);
});
