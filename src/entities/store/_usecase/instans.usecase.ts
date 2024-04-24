import "reflect-metadata";

import storeContainer from "../module";
import { GetStoreListUseCase } from "./getStoreList.usecase";
import { GetStoreUseCase } from "./getStore.usecase";
import { GetStoreBySlugUseCase } from "./getStoreBySlug.usecase";
import { GetStoreWithRelationUseCase } from "./getStoreWithRelation.usecase";

export const getStoreListUseCase = storeContainer.get(GetStoreListUseCase);

export const getStoreUseCase = storeContainer.get(GetStoreUseCase);

export const getStoreBySlugUseCase = storeContainer.get(GetStoreBySlugUseCase);

export const getStoreWithRelationUseCase = storeContainer.get(
  GetStoreWithRelationUseCase,
);
