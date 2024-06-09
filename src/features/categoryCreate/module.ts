import { ContainerModule } from "inversify";
import { CategoryCreateService } from "./_service/categoryCreate.service";
import { CategoryCreateTx } from "./_tx/categoryCreate.transaction";
import { CategoryCreateController } from "./_controller/categoryCreate.controller";
import { Controller } from "@/kernel/lib/trpc/server";
import { ICategoryCreateTx } from "./_domain/transaction.type";

export const CategoryCreateModule = new ContainerModule((bind) => {
  bind(ICategoryCreateTx).to(CategoryCreateTx);
  bind(CategoryCreateService).toSelf();

  bind(Controller).to(CategoryCreateController);
});
