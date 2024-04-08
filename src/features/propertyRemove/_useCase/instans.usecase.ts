import "reflect-metadata";
import propertyRemoveContainer from "../module";
import { RemovePropertyComplexibleUseCase } from "./propertyRemoveComplexible.usecase";

export const removePropertyComplexibleUseCase = propertyRemoveContainer.get(
  RemovePropertyComplexibleUseCase,
);
