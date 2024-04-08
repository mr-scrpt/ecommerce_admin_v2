import "reflect-metadata";

import categoryContainer from "../module";
import { GetCartWithRelationUseCase } from "./getCartWithRelation.usecase";

export const getCartWithRelationUseCase = categoryContainer.get(
  GetCartWithRelationUseCase,
);
