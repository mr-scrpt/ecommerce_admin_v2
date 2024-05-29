import { CategoryBase } from "./types";

// NOTE: Queries
export type CategoryGetDTO = {
  id: string;
};

export type CategoryGetBySlugDTO = {
  slug: string;
};

// NOTE: Mutations
export type CategoryCreateDTO = CategoryBase;

export type CategoryUpdateDTO = Partial<CategoryBase> & {
  id: string;
};

export type CategoryRemoveDTO = {
  id: string;
};

export type CategoryRemoveBySlugDTO = {
  slug: string;
};

// NOTE: Bindings
export type CategoryBindProductListDTO = {
  id: string;
  productListId: Array<{ id: string }>;
};

export type CategoryBindPropertyListDTO = {
  id: string;
  propertyListId: Array<{ id: string }>;
};
