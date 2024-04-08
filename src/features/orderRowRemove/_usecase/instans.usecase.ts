import "reflect-metadata";

import orderOwnerDataContainer from "../module";
import { RemoveOrderRowComplexibleUseCase } from "./orderRemoveRowComplexible.usecase";

export const removeOrderRowComplexibleUseCase = orderOwnerDataContainer.get(
  RemoveOrderRowComplexibleUseCase,
);
