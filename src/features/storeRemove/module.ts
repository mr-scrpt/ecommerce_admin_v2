import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { StoreRepository } from "@/entities/store/server";
import { StoreRemoveTx } from "./_tx/storeRemove.transaction";
import { RemoveStoreComplexibleUseCase } from "./_useCase/storeRemoveComplexible.usecase";

const storeRemoveContainer = new Container();

export const StoreRemoveModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(StoreRemoveTx).toSelf();
  bind(StoreRepository).toSelf();
  bind(RemoveStoreComplexibleUseCase).toSelf();
});

storeRemoveContainer.load(StoreRemoveModule);

export default storeRemoveContainer;
