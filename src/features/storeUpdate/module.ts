import { Container, ContainerModule } from "inversify";
import { StoreRepository } from "@/entities/store/server";
import { StoreUpdateTx } from "./_tx/storeUpdate.transaction";
import { UpdateStoreComplexibleUseCase } from "./_usecase/storeUpdateComplexible.usecase";

export const storeUpdateContainer = new Container();

export const StoreUpdateModule = new ContainerModule((bind) => {
  bind(StoreUpdateTx).toSelf();
  bind(StoreRepository).toSelf();
  bind(UpdateStoreComplexibleUseCase).toSelf();
});

storeUpdateContainer.load(StoreUpdateModule);
