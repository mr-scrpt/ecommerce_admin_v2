// NOTE: DTO
export type CategoryGetDto = {
  categoryId: string;
};

export type CategoryGetBySlugDto = {
  slug: string;
};

export type CategoryCreateDTO = {
  name: string;
  slug: string;
  board: Array<string>;
};

export type CategoryUpdateDTO = {
  categoryId: string;
  name: string;
  slug: string;
  board: Array<string>;
};

export type CategoryRemoveDTO = {
  categoryId: string;
};

export type CategoryRemoveBySlugDTO = {
  slug: string;
};

export type CategoryAddProductListDTO = {
  categoryId: string;
  productListId: Array<{ id: string }>;
};

export type CategoryAddPropertyListDTO = {
  categoryId: string;
  propertyListId: Array<{ id: string }>;
};
