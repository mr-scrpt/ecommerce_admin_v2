import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";

export const baseQueryKey = "product";
export type ProductId = string;
export type ProductSlug = string;

export type ProductEntity = {
  id: ProductId;
  name: string;
  article: string;
  description: string;
  about: string;
  inStock: number;
  slug: ProductSlug;
  img: Array<string>;
  price: number;
  createdAt: Date;
};

export type ProductRelationEntity = ProductEntity & {
  categoryList: Array<ProductCategory>;
  propertyItemListSelected: Array<ProductPropertyItem>;
};

// Projetions

export type Product = {
  id: ProductId;
  name: string;
  article: string;
  price: number;
  inStock: number;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
};

export type ProductRelation = Product & {
  categoryList: Array<ProductCategory>;
  propertyItemListSelected: Array<ProductPropertyItem>;
};

export type ProductToCreate = {
  name: string;
  article: string;
  price: number;
  description: string;
  about: string;
  inStock: number;
  slug: ProductSlug;
  img: Array<string>;
};

export type ProductToUpdate = {
  name: string;
  article: string;
  price: number;
  description: string;
  about: string;
  inStock: number;
  slug: ProductSlug;
  img: Array<string>;
};

export type ProductAddCategoryList = {
  productId: string;
  categoryListId: Array<{ id: string }>;
};

export type ProductAddPropertyList = {
  productId: string;
  propertyListId: Array<{ id: string }>;
};

export type ProductFromFrom = {
  name: string;
  article: string;
  price: number;
  description: string;
  about: string;
  inStock: number;
  img: Array<string>;
  categoryList: Array<{ id: string }>;
  propertyItemListSelected: Array<{ id: string }>;
};

// export type ProductToUpdate = ProductFromFrom & {
//   id: ProductId;
//   slug: ProductSlug;
// };

// NOTE: Side
export type ProductCategory = {
  id: string;
  name: string;
};

export type ProductPropertyItem = {
  id: string;
  name: string;
  value: string;
  propertyId: string;
};

export type ProductPropertyObjectList = {
  [key: string]: string | string[];
};

// NOTE: UI
export type ProductPropertyToSelect = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  propertyList: Array<MultiSelectOptionItem>;
};

export type ProductToSelect = {
  value: string;
  article: string;
  label: string;
  inStock: boolean;
  disabled: boolean;
};

export type ProductToSelectGroup = {
  available: Array<ProductToSelect>;
  inOrder: Array<ProductToSelect>;
  outOfStock: Array<ProductToSelect>;
};
