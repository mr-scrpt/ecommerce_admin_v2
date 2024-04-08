import "reflect-metadata";
import orderCreateContainer from "../module";

import { CreateOrderComplexibleUseCase } from "./orderCreateCopmlexible.usecase";

export const createOrderComplexibleUseCase = orderCreateContainer.get(
  CreateOrderComplexibleUseCase,
);
