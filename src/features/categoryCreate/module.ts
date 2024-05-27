import { ContainerModule } from "inversify";
import { CategoryCreateTx } from "./_tx/categoryCreate.transaction";
import { CreateCategoryComplexibleUseCase } from "./_usecase/categoryCreateComplexible.usecase";
import { CategoryCreateService } from "./_service/categoryCreate.service";

export const CategoryCreateModule = new ContainerModule((bind) => {
  bind(CategoryCreateTx).toSelf();
  bind(CategoryCreateService).toSelf();
});
