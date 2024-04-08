import "reflect-metadata";

import userRemoveContainer from "../module";
import { RemoveUserComplexibleUseCase } from "./removeUserComplexible.usecase";

export const removeUserComplexibleUseCase = userRemoveContainer.get(
  RemoveUserComplexibleUseCase,
);
