import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { GetCategoryListService } from "./_service/getCategoryList.service";
import { GetCategoryUseCase } from "./_usecase/getCategory.usecase";
import { GetCategoryListUseCase } from "./_usecase/getCategoryList.usecase";

export const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  // bind(DBClient).toConstantValue(dbClient);
  bind(CategoryRepository).toSelf();
  bind(GetCategoryListService).toSelf();
  bind(GetCategoryUseCase).toSelf();
  bind(GetCategoryListUseCase).toSelf();
});

categoryContainer.load(CategoryModule);
