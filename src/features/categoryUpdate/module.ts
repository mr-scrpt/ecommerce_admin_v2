import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { CategoryUpdateController } from "./_controller/categoryUpdate.controller";
import { CategoryUpdateService } from "./_service/categoryUpdate.service";
import { CategoryUpdateTx } from "./_tx/categoryUpdate.transaction";
import { ICategoryUpdateTx } from "./_domain/transaction.type";

export const CategoryUpdateModule = new ContainerModule((bind) => {
  bind(ICategoryUpdateTx).to(CategoryUpdateTx);
  bind(CategoryUpdateService).toSelf();

  bind(Controller).to(CategoryUpdateController);
});
