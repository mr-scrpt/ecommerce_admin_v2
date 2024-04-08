import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { GetCategoryUseCase } from "./_usecase/getCategory.usecase";
import { GetCategoryBySlugUseCase } from "./_usecase/getCategoryBySlug.usecase";
import { GetCategoryListUseCase } from "./_usecase/getCategoryList.usecase";
import { GetCategoryWithRelationUseCase } from "./_usecase/getCategoryWithRelation.usecase";

const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CategoryRepository).toSelf();
  bind(GetCategoryListUseCase).toSelf();
  bind(GetCategoryUseCase).toSelf();
  bind(GetCategoryBySlugUseCase).toSelf();
  bind(GetCategoryWithRelationUseCase).toSelf();
});

categoryContainer.load(CategoryModule);

export default categoryContainer;
