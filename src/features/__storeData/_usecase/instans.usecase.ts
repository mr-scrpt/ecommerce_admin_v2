import "reflect-metadata";

import storeDataContainer from "../module";
import { GetStoreListWithSettlementNameUseCase } from "./getStoreListWithSettlementName.usecase";
import { GetStoreListWithSettlementNameBySettlementUseCase } from "./getStoreListWithSettlementBySettlementName.usecase";
import { GetStoreSettlementToSelectUseCase } from "./getStoreSettlementToSelect.usecase";

export const getStoreListWithSettlementNameUseCase = storeDataContainer.get(
  GetStoreListWithSettlementNameUseCase,
);

export const getStoreListWithSettlementNameBySettlementUseCase =
  storeDataContainer.get(GetStoreListWithSettlementNameBySettlementUseCase);

export const getStoreSettlementToSelectUseCase = storeDataContainer.get(
  GetStoreSettlementToSelectUseCase,
);
