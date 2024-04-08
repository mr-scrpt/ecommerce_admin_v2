import "reflect-metadata";

import orderOwnerDataContainer from "../module";
import { UpdateOrderStatusComplexibleUseCase } from "./orderStatusUpdateComplexible.usecase";

export const updateOrderStatusComplexibleUseCase = orderOwnerDataContainer.get(
  UpdateOrderStatusComplexibleUseCase,
);
