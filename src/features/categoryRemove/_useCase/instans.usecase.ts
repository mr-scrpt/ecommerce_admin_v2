import "reflect-metadata";
import categoryRemoveContainer from "../module";
import { RemoveCategoryComplexibleUseCase } from "./categoryRemoveComplexible.usecase";

export const removeCategoryComplexibleUseCase = categoryRemoveContainer.get(
  RemoveCategoryComplexibleUseCase,
);
