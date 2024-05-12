import "reflect-metadata";
import productRemoveContainer from "../module";
import { RemoveProductComplexibleUseCase } from "./productRemoveComplexible.usecase";

export const removeProductComplexibleUseCase = productRemoveContainer.get(
  RemoveProductComplexibleUseCase,
);
