import "reflect-metadata";
import propertyCreateContainer from "../module";
import { CreatePropertyComplexibleUseCase } from "./propertyCreateComplexible.usecase";

export const createPropertyComplexibleUseCase = propertyCreateContainer.get(
  CreatePropertyComplexibleUseCase,
);
