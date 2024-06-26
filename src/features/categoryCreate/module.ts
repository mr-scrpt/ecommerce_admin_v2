import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { CreateCategoryComplexibleUseCase } from "./_usecase/categoryCreateComplexible.usecase";
import { CategoryCreateTx } from "./_tx/categoryCreate.transaction";
import { CategoryRepository } from "@/entities/category/server";

const categoryCreateContainer = new Container();

export const CategoryCreateModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(CategoryCreateTx).toSelf();
  bind(CategoryRepository).toSelf();
  bind(CreateCategoryComplexibleUseCase).toSelf();
});

categoryCreateContainer.load(CategoryCreateModule);

export default categoryCreateContainer;
