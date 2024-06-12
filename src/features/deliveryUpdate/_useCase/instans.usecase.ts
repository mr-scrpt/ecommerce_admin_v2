import "reflect-metadata";

import orderDeliveryUpdateContainer from "../module";

import { OrderUpdateDeliveryUseCase } from "./orderUpdateDelivery.usecase";

export const updateOrderDeliveryUseCase = orderDeliveryUpdateContainer.get(
  OrderUpdateDeliveryUseCase,
);
