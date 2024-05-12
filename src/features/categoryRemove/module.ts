import { CategoryRepository } from "@/entities/category/server";
import { Container, ContainerModule } from "inversify";
import { CategoryRemoveTx } from "./_tx/categoryRemove.transaction";
import { RemoveCategoryComplexibleUseCase } from "./_useCase/categoryRemoveComplexible.usecase";

export const categoryRemoveContainer = new Container();

export const CategoryRemoveModule = new ContainerModule((bind) => {
  bind(CategoryRemoveTx).toSelf();
  bind(CategoryRepository).toSelf();
  bind(RemoveCategoryComplexibleUseCase).toSelf();
});

categoryRemoveContainer.load(CategoryRemoveModule);
