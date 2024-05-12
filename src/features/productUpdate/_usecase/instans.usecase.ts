import "reflect-metadata";
import productUpdateContainer from "../module";
import { UpdateProductComplexibleUseCase } from "./updateProductComplexible.usecase";

export const updateProductComplexibleUseCase = productUpdateContainer.get(
  UpdateProductComplexibleUseCase,
);
