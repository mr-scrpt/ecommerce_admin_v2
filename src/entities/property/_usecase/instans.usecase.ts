import "reflect-metadata";

import propertyContainer from "../module";
import { GetPropertyUseCase } from "./property/getProperty.usecase";
import { GetPropertyListUseCase } from "./property/getPropertyList.usecase";
import { GetPropertyWithRelationUseCase } from "./property/getPropertyWithRelation.usecase";
import { GetPropertyWithRelationByCategoryUseCase } from "./property/getPropertyWithRelationByCategory.usecase";

export const getPropertyUseCase = propertyContainer.get(GetPropertyUseCase);
export const getPropertyListUseCase = propertyContainer.get(
  GetPropertyListUseCase,
);
export const getPropertyWithRelationUseCase = propertyContainer.get(
  GetPropertyWithRelationUseCase,
);
export const getPropertyWithRelationByCategoryUseCase = propertyContainer.get(
  GetPropertyWithRelationByCategoryUseCase,
);
