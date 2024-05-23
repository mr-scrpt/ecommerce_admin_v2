import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { CategoryListGetService } from "./_service/CategoryListGet.service";
import { CategoryController } from "./_controller/category.controller";
import { Controller } from "@/kernel/lib/trpc/module";
import { CategoryGetService } from "./_service/CategoryGet.service";

export const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  bind(CategoryRepository).toSelf();
  bind(CategoryListGetService).toSelf();
  bind(CategoryGetService).toSelf();
  bind(Controller).to(CategoryController);
});

categoryContainer.load(CategoryModule);
