import "reflect-metadata";

import orderOwnerDataContainer from "../module";
import { UpdateOrderRowQuantityComplexibleUseCase } from "./orderRowUpdateQuantityComplexible.usecase";

export const updateOrderRowQuantityComplexibleUseCase =
  orderOwnerDataContainer.get(UpdateOrderRowQuantityComplexibleUseCase);
