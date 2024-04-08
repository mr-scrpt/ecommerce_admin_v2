import "reflect-metadata";
import productCreateContainer from "../module";
import { RemoveProductComplexibleUseCase } from "./productRemoveComplexible.usecase";

export const removeProductComplexibleUseCase = productCreateContainer.get(
  RemoveProductComplexibleUseCase,
);
