import "reflect-metadata";
import storeRemoveContainer from "../module";
import { RemoveStoreComplexibleUseCase } from "./storeRemoveComplexible.usecase";

export const removeStoreComplexibleUseCase = storeRemoveContainer.get(
  RemoveStoreComplexibleUseCase,
);
