import "reflect-metadata";

import storeDataContainer from "../module";
import { GetStoreListWithSettlementNameUseCase } from "./getStoreListWithSettlementName.usecase";

export const getStoreListWithSettlementNameUseCase = storeDataContainer.get(
  GetStoreListWithSettlementNameUseCase,
);
