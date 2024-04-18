import "reflect-metadata";

import deliveryContainer from "../module";

import { GetSettlementListSearchToSelectUseCase } from "../../settlement/_usecase/getSettlementListSearchToSelect.usecase";
import { InitSettlementListUseCase } from "../../settlement/_usecase/initSettlementList.usecase";

export const getSettlementListSearchToSelectUseCase = deliveryContainer.get(
  GetSettlementListSearchToSelectUseCase,
);

export const initSettlementListUseCase = deliveryContainer.get(
  InitSettlementListUseCase,
);
