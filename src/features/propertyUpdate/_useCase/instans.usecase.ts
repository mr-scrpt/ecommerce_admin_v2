import "reflect-metadata";
import propertyCreateContainer from "../module";
import { UpdatePropertyComplexibleUseCase } from "./propertyUpdateComplexible.usecase";

export const updatePropertyComplexibleUseCase = propertyCreateContainer.get(
  UpdatePropertyComplexibleUseCase,
);
