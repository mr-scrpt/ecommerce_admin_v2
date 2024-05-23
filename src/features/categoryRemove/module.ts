import { CategoryRepository } from "@/entities/category/server";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { Container, ContainerModule } from "inversify";
import { CategoryRemoveController } from "./_controller/categoryRemove.controller";
import { CategoryRemoveService } from "./_service/categoryRemove.service";
import { CategoryRemoveTx } from "./_tx/categoryRemove.transaction";

export const categoryRemoveContainer = new Container();

export const CategoryRemoveModule = new ContainerModule((bind) => {
  bind(CategoryRemoveTx).toSelf();
  // bind(CategoryRepository).toSelf();
  bind(CategoryRemoveService).toSelf();
  bind(Controller).to(CategoryRemoveController);
});

categoryRemoveContainer.load(CategoryRemoveModule);
