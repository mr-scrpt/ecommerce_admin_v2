import "reflect-metadata";
import categoryUpdateContainer from "../module";
import { UpdateCategoryComplexibleUseCase } from "./categoryUpdateComplexible.usecase";

export const updateCategoryComplexibleUseCase = categoryUpdateContainer.get(
  UpdateCategoryComplexibleUseCase,
);
