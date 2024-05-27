import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { CategoryUpdateController } from "./_controller/categoryUpdate.controller";
import { CategoryUpdateService } from "./_service/categoryUpdate.service";
import { CategoryUpdateTx } from "./_tx/categoryUpdate.transaction";

export const CategoryUpdateModule = new ContainerModule((bind) => {
  bind(CategoryUpdateTx).toSelf();
  bind(CategoryUpdateService).toSelf();
  bind(Controller).to(CategoryUpdateController);
});
