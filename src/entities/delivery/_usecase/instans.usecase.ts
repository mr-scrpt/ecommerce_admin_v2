import "reflect-metadata";

import deliveryContainer from "../module";
import { GetDeliveryListUseCase } from "./getDeliveryList.usecase";
import { GetDeliveryUseCase } from "./getDelivery.usecase";
import { GetDeliveryByOrderIdUseCase } from "./getDeliveryOrderId.usecase";
import { GetSettlementListSearchToSelectUseCase } from "./getSettlementListSearchToSelect.usecase";

export const getDeliveryListUseCase = deliveryContainer.get(
  GetDeliveryListUseCase,
);

export const getDeliveryUseCase = deliveryContainer.get(GetDeliveryUseCase);

export const getDeliveryByOrderIdUseCase = deliveryContainer.get(
  GetDeliveryByOrderIdUseCase,
);

export const getSeetmentListSearchToSelectUseCase = deliveryContainer.get(
  GetSettlementListSearchToSelectUseCase,
);
