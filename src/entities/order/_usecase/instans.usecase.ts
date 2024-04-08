import "reflect-metadata";

import orderContainer from "../module";
import { GetOrderListUseCase } from "./getOrderList.usecase";
import { GetOrderStatusGroupUseCase } from "./getOrderStatusGroup.usecase";
import { GetOrderWithRelationUseCase } from "./getOrderWithRelation.usecase";

export const getOrderListUseCase = orderContainer.get(GetOrderListUseCase);
export const getOrderWithRelationUseCase = orderContainer.get(
  GetOrderWithRelationUseCase,
);
export const getOrderStatusGroupUseCase = orderContainer.get(
  GetOrderStatusGroupUseCase,
);
