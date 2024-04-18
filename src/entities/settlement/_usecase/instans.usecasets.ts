import "reflect-metadata";

import deliveryContainer from "../module";
import { GetSettlementListSearchToSelectUseCase } from "./getSettlementListSearchToSelect.usecase";
import { InitSettlementListUseCase } from "./initSettlementList.usecase";

export const getSettlementListSearchToSelectUseCase = deliveryContainer.get(
  GetSettlementListSearchToSelectUseCase,
);

export const initSettlementListUseCase = deliveryContainer.get(
  InitSettlementListUseCase,
);
