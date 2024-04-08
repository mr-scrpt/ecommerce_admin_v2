import "reflect-metadata";
import categoryCreateContainer from "../module";

import { CreateCategoryComplexibleUseCase } from "./categoryCreateComplexible.usecase";

export const createCategoryComplexibleUseCase = categoryCreateContainer.get(
  CreateCategoryComplexibleUseCase,
);
