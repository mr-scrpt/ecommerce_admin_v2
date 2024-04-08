import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "@/entities/category/server";
import { CategoryRemoveTx } from "./_tx/categoryRemove.transaction";
import { RemoveCategoryComplexibleUseCase } from "./_useCase/categoryRemoveComplexible.usecase";

const categoryRemoveContainer = new Container();

export const CategoryRemoveModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CategoryRemoveTx).toSelf();
  bind(CategoryRepository).toSelf();
  bind(RemoveCategoryComplexibleUseCase).toSelf();
});

categoryRemoveContainer.load(CategoryRemoveModule);

export default categoryRemoveContainer;
