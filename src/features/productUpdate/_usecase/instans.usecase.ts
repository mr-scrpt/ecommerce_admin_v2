import "reflect-metadata";
import productCreateContainer from "../module";
import { UpdateProductComplexibleUseCase } from "./updateProductComplexible.usecase";

export const updateProductComplexibleUseCase = productCreateContainer.get(
  UpdateProductComplexibleUseCase,
);
