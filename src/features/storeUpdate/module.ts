import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { StoreRepository } from "@/entities/store/server";
import { StoreUpdateTx } from "./_tx/storeUpdate.transaction";
import { UpdateStoreComplexibleUseCase } from "./_usecase/storeUpdateComplexible.usecase";

const storeUpdateContainer = new Container();

export const StoreRemoveModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(StoreUpdateTx).toSelf();
  bind(StoreRepository).toSelf();
  bind(UpdateStoreComplexibleUseCase).toSelf();
});

storeUpdateContainer.load(StoreRemoveModule);

export default storeUpdateContainer;
