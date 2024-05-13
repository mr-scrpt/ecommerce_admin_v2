import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { GetCategoryListService } from "./_service/getCategoryList.service";
import { GetCategoryUseCase } from "./_usecase/getCategory.usecase";
import { GetCategoryListUseCase } from "./_usecase/getCategoryList.usecase";
import { Service } from "@/app/initAction";
import { GetCategoryService } from "./_service/getCategory.service";

export const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  // bind(DBClient).toConstantValue(dbClient);
  bind(CategoryRepository).toSelf();
  // bind(Service).to(GetCategoryListService);
  // bind(Service).to(GetCategoryBySlugService);
  bind(GetCategoryListService).toSelf();
  bind(GetCategoryService).toSelf();
  bind(GetCategoryUseCase).toSelf();
  bind(GetCategoryListUseCase).toSelf();
});

categoryContainer.load(CategoryModule);
