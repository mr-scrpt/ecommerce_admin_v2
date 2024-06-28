import "reflect-metadata";
import storeUpdateContainer from "../module";
import { UpdateStoreComplexibleUseCase } from "./storeUpdateComplexible.usecase";

export const updateStoreComplexibleUseCase = storeUpdateContainer.get(
  UpdateStoreComplexibleUseCase,
);
