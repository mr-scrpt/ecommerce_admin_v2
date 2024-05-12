import { CategoryRepository } from "@/entities/category/server";
import { Container, ContainerModule } from "inversify";
import { CategoryUpdateTx } from "./_tx/categoryUpdate.transaction";
import { UpdateCategoryComplexibleUseCase } from "./_usecase/categoryUpdateComplexible.usecase";

export const categoryUpdateContainer = new Container();

export const CategoryRemoveModule = new ContainerModule((bind) => {
  bind(CategoryUpdateTx).toSelf();
  bind(CategoryRepository).toSelf();
  bind(UpdateCategoryComplexibleUseCase).toSelf();
});

categoryUpdateContainer.load(CategoryRemoveModule);
