import { ContainerModule } from "inversify";
import { CategoryController } from "./_controller/category.controller";
import { CategoryRepository } from "./_repository/category.repo";
import { CategoryRelationGetService } from "./_service/categoryRelationGet.service";
import { CategoryListGetService } from "./_service/categoryListGet.service";
import { Controller } from "@/kernel/lib/trpc/server";

export const CategoryModule = new ContainerModule((bind) => {
  bind(CategoryRepository).toSelf();
  bind(CategoryRelationGetService).toSelf();
  bind(CategoryListGetService).toSelf();
  bind(Controller).to(CategoryController);
});
