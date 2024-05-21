import { Container, ContainerModule } from "inversify";
import { CategoryRepository } from "./_repository/category.repo";
import { GetCategoryListService } from "./_service/getCategoryList.service";

export const categoryContainer = new Container();

export const CategoryModule = new ContainerModule((bind) => {
  bind(CategoryRepository).toSelf();
  bind(GetCategoryListService).toSelf();
});

categoryContainer.load(CategoryModule);
