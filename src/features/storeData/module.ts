import { DBClient, dbClient } from "@/shared/lib/db";
import { Container, ContainerModule } from "inversify";
import { StoreDataTx } from "./_tx/storeData.transaction";
import { GetStoreListWithSettlementNameUseCase } from "./_usecase/getStoreListWithSettlementName.usecase";
import { StoreRepository } from "@/entities/store/server";
import { SettlementRepository } from "@/entities/settlement/_repository/settlement.repo";
import { GetStoreListWithSettlementNameBySettlementUseCase } from "./_usecase/getStoreListWithSettlementBySettlementName.usecase";
import { GetStoreSettlementToSelectUseCase } from "./_usecase/getStoreSettlementToSelect.usecase";

const storeDataContainer = new Container();

export const StoreModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(StoreRepository).toSelf();
  bind(SettlementRepository).toSelf();
  bind(StoreDataTx).toSelf();
  bind(GetStoreListWithSettlementNameUseCase).toSelf();
  bind(GetStoreListWithSettlementNameBySettlementUseCase).toSelf();
  bind(GetStoreSettlementToSelectUseCase).toSelf();
});

storeDataContainer.load(StoreModule);

export default storeDataContainer;
