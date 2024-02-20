export const baseQueryKey = "category";
export type CategoryId = string;
export type CategorySlug = string;

export type CategoryEntity = {
  id: CategoryId;
  name: string;
  slug: CategorySlug;
  board: Array<string>;
  createdAt: Date;
};

export type CategoryRelationEntity = CategoryEntity & {
  productList: Array<ProductListItem>;
  optionList: Array<OptionListItem>;
};

// Projetions

export type Category = {
  id: CategoryId;
  name: string;
  slug: CategorySlug;
  board: Array<string>;
  createdAt: Date;
};

export type CategoryRelation = Category & {
  productList: Array<ProductListItem>;
  optionList: Array<OptionListItem>;
};
export type CategoryToCreate = {
  name: string;
  slug: CategorySlug;
  board: Array<string>;
};

// export type CategoryCombineCreate = {
//   name: string;
//   slug: CategorySlug;
//   board: Array<string>;
//   productList: Array<{ id: string }>;
//   optionList: Array<{ id: string }>;
// };

export type CategoryToUpdate = {
  id: CategoryId;
  name: string;
};

export type CategoryAddProductList = {
  categoryId: string;
  productListId: Array<{ id: string }>;
};

export type CategoryAddOptionList = {
  categoryId: string;
  optionListId: Array<{ id: string }>;
};

// Side
type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  img: string[];
  createdAt: Date;
};

// Тип для элемента массива optionList
type OptionListItem = {
  id: string;
  name: string;
  datatype: string;
};
