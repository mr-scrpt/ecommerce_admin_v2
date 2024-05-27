// NOTE: DTO
export type CategoryCreateDTO = {
  name: string;
  slug: string;
  board: Array<string>;
};

export type CategoryUpdateDTO = {
  id: string;
  name: string;
  slug: string;
  board: Array<string>;
};

export type CategoryAddProductListDTO = {
  categoryId: string;
  productListId: Array<{ id: string }>;
};

export type CategoryAddPropertyListDTO = {
  categoryId: string;
  propertyListId: Array<{ id: string }>;
};
