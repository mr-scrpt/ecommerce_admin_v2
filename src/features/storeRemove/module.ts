import { Container, ContainerModule } from "inversify";
import { StoreRepository } from "@/entities/store/server";
import { StoreRemoveTx } from "./_tx/storeRemove.transaction";
import { RemoveStoreComplexibleUseCase } from "./_useCase/storeRemoveComplexible.usecase";

export const storeRemoveContainer = new Container();

export const StoreRemoveModule = new ContainerModule((bind) => {
  bind(StoreRemoveTx).toSelf();
  bind(StoreRepository).toSelf();
  bind(RemoveStoreComplexibleUseCase).toSelf();
});

storeRemoveContainer.load(StoreRemoveModule);
