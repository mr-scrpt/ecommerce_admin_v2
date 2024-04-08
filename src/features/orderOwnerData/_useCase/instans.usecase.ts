import "reflect-metadata";

import { GetOrderOwnerDataComplexibleUseCase } from "./getOrderOwnerDataComplexible.usecase";
import orderOwnerDataContainer from "../module";

export const getOrderOwnerDataComplexibleUseCase = orderOwnerDataContainer.get(
  GetOrderOwnerDataComplexibleUseCase,
);
