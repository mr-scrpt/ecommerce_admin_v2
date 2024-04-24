import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/store.repo";
import { GetCategoryUseCase } from "./_usecase/getStore.usecase";
import { GetCategoryBySlugUseCase } from "./_usecase/getStoreBySlug.usecase";
import { GetCategoryListUseCase } from "./_usecase/getStoreList.usecase";
import { GetCategoryWithRelationUseCase } from "./_usecase/getStoreWithRelation.usecase";

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
