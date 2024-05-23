import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { GetCategoryListService } from "./_service/getCategoryList.service";
import { CategoryController } from "./_controller/category.controller";
import { Controller } from "@/kernel/lib/trpc/module";
import { GetCategoryService } from "./_service/getCategory.service";

export const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  bind(CategoryRepository).toSelf();
  bind(GetCategoryListService).toSelf();
  bind(GetCategoryService).toSelf();
  bind(Controller).to(CategoryController);
});

categoryContainer.load(CategoryModule);
