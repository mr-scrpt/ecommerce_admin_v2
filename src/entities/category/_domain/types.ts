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
  propertyList: Array<PropertyListItem>;
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
  propertyList: Array<PropertyListItem>;
};

export type CategoryToCreate = {
  name: string;
  slug: CategorySlug;
  board: Array<string>;
};

export type CategoryToUpdate = {
  id: CategoryId;
  name: string;
  slug: CategorySlug;
  board: Array<string>;
};

export type CategoryAddProductList = {
  categoryId: string;
  productListId: Array<{ id: string }>;
};

export type CategoryAddPropertyList = {
  categoryId: string;
  propertyListId: Array<{ id: string }>;
};

// Side
type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  img: string[];
  createdAt: Date;
};

type PropertyListItem = {
  id: string;
  name: string;
  datatype: string;
};
