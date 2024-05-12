import { Container, ContainerModule } from "inversify";
import { StoreRepository } from "./_repository/store.repo";
import { GetStoreUseCase } from "./_usecase/getStore.usecase";
import { GetStoreListUseCase } from "./_usecase/getStoreList.usecase";

export const storeContainer = new Container();

export const StoreModule = new ContainerModule((bind) => {
  bind(StoreRepository).toSelf();
  bind(GetStoreListUseCase).toSelf();
  bind(GetStoreUseCase).toSelf();
});

storeContainer.load(StoreModule);

// export default storeContainer;
