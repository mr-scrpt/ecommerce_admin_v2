import { ContainerModule } from "inversify";
import { StoreUpdateTx } from "./_tx/storeUpdate.transaction";
import { IStoreUpdateTx } from "./_domain/transaction.type";

// export const storeUpdateContainer = new Container();

export const StoreUpdateModule = new ContainerModule((bind) => {
  bind(IStoreUpdateTx).to(StoreUpdateTx);
  // bind(StoreRepository).toSelf();
  // bind(UpdateStoreComplexibleUseCase).toSelf();
});

// storeUpdateContainer.load(StoreUpdateModule);
