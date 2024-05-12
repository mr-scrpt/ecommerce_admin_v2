import "reflect-metadata";

import { categoryContainer } from "../module";
import { GetCategoryListUseCase } from "../_usecase/getCategoryList.usecase";
import { GetCategoryUseCase } from "./getCategory.usecase";
import { GetCategoryBySlugUseCase } from "./getCategoryBySlug.usecase";
import { GetCategoryWithRelationUseCase } from "./getCategoryWithRelation.usecase";

export const getCategoryListUseCase = categoryContainer.get(
  GetCategoryListUseCase,
);

export const getCategoryUseCase = categoryContainer.get(GetCategoryUseCase);

export const getCategoryBySlugUseCase = categoryContainer.get(
  GetCategoryBySlugUseCase,
);

export const getCategoryWithRelationUseCase = categoryContainer.get(
  GetCategoryWithRelationUseCase,
);
