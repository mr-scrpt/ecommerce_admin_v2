import "reflect-metadata";
import productCreateContainer from "../module";
import { CreateProductComplexibleUseCase } from "./productCreateComplexible.usecase";

export const createProductComplexibleUseCase = productCreateContainer.get(
  CreateProductComplexibleUseCase,
);
