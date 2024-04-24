import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { StoreRepository } from "./_repository/store.repo";
import { GetStoreUseCase } from "./_usecase/getStore.usecase";
import { GetStoreListUseCase } from "./_usecase/getStoreList.usecase";

const storeContainer = new Container();

export const StoreModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(StoreRepository).toSelf();
  bind(GetStoreListUseCase).toSelf();
  bind(GetStoreUseCase).toSelf();
});

storeContainer.load(StoreModule);

export default storeContainer;
