import "reflect-metadata";

import deliveryContainer from "../module";
import { GetDeliveryListUseCase } from "./getDeliveryList.usecase";
import { GetDeliveryUseCase } from "./getDelivery.usecase";
import { GetDeliveryByOrderIdUseCase } from "./getDeliveryOrderId.usecase";
import { InitSettlementListUseCase } from "../../settlement/_usecase/initSettlementList.usecase";
import { GetDeliveryListSearchToSelectUseCase } from "../../settlement/_usecase/getSettlementListSearchToSelect.usecase";

export const getDeliveryListUseCase = deliveryContainer.get(
  GetDeliveryListUseCase,
);

export const getDeliveryUseCase = deliveryContainer.get(GetDeliveryUseCase);

export const getDeliveryByOrderIdUseCase = deliveryContainer.get(
  GetDeliveryByOrderIdUseCase,
);

export const getDeliveryListSearchToSelectUseCase = deliveryContainer.get(
  GetDeliveryListSearchToSelectUseCase,
);

export const initSettlementListUseCase = deliveryContainer.get(
  InitSettlementListUseCase,
);
