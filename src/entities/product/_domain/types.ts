import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";

export const baseQueryKey = "product";
export type ProductId = string;
export type ProductSlug = string;

export type ProductEntity = {
  id: ProductId;
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
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
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  // categoryList: Array<{ id: string }>;
};

export type ProductAddCategoryList = {
  productId: string;
  categoryListId: Array<{ id: string }>;
};

export type ProductToUpdate = {
  id: ProductId;
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  categoryList: Array<{ id: string }>;
};

// Side
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

// UI
export type ProductPropertyToSelect = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  propertyList: Array<MultiSelectOptionItem>;
};
