import { Controller } from "@/kernel/lib/trpc/module";
import { ContainerModule } from "inversify";
import { CategoryController } from "./_controller/category.controller";
import { CategoryRepository } from "./_repository/category.repo";
import { CategoryGetService } from "./_service/CategoryGet.service";
import { CategoryListGetService } from "./_service/CategoryListGet.service";

export const CategoryModule = new ContainerModule((bind) => {
  bind(CategoryRepository).toSelf();
  bind(CategoryGetService).toSelf();
  bind(CategoryListGetService).toSelf();
  bind(Controller).to(CategoryController);
});
