import { dbClient } from "@/shared/lib/db";
import { PrismaClient } from "@prisma/client";
import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { GetCategoryListUseCase } from "./_usecase/getCategoryList.usecase";

const categoryContainer = new Container();

export const CoursesListModule = new ContainerModule((bind) => {
  bind(GetCategoryListUseCase).toSelf();
  bind(PrismaClient).toConstantValue(dbClient);
  bind(CategoryRepository).toSelf();
});

categoryContainer.load(CoursesListModule);

export default categoryContainer;
