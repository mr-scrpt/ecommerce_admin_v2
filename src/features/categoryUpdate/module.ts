import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "@/entities/category/server";
import { CategoryUpdateTx } from "./_tx/categoryUpdate.transaction";
import { UpdateCategoryComplexibleUseCase } from "./_usecase/categoryUpdateComplexible.usecase";

const categoryUpdateContainer = new Container();

export const CategoryRemoveModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CategoryUpdateTx).toSelf();
  bind(CategoryRepository).toSelf();
  bind(UpdateCategoryComplexibleUseCase).toSelf();
});

categoryUpdateContainer.load(CategoryRemoveModule);

export default categoryUpdateContainer;
