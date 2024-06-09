import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { CategoryRemoveController } from "./_controller/categoryRemove.controller";
import { CategoryRemoveService } from "./_service/categoryRemove.service";
import { CategoryRemoveTx } from "./_tx/categoryRemove.transaction";
import { ICategoryRemoveTx } from "./_domain/transaction.type";

export const CategoryRemoveModule = new ContainerModule((bind) => {
  bind(ICategoryRemoveTx).to(CategoryRemoveTx);
  bind(CategoryRemoveService).toSelf();
  bind(Controller).to(CategoryRemoveController);
});
