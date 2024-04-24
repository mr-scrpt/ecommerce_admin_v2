import "reflect-metadata";

import storeContainer from "../module";
import { GetStoreListUseCase } from "./getStoreList.usecase";
import { GetStoreUseCase } from "./getStore.usecase";

export const getStoreListUseCase = storeContainer.get(GetStoreListUseCase);

export const getStoreUseCase = storeContainer.get(GetStoreUseCase);
