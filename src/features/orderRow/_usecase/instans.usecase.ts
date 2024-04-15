import "reflect-metadata";

import orderRowAddContainer from "../module";
import { AddOrderRowComplexibleUseCase } from "./orderAddRowComplexible.usecase";

export const addOrderRowComplexibleUseCase = orderRowAddContainer.get(
  AddOrderRowComplexibleUseCase,
);
