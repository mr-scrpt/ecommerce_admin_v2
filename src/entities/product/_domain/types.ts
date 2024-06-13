import { PropertyDataTypeEnum } from "@/kernel/domain/property.type";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";

// NOTE: Base
export type ProductBase = {
  name: string;
  article: string;
  description: string;
  about: string;
  inStock: number;
  slug: string;
  img: Array<string>;
  price: number;
};

export type ProductEntity = ProductBase & {
  id: string;
  createdAt: Date;
};

export type ProductRelationEntity = ProductEntity & {
  categoryList: Array<ProductCategory>;
  propertyItemListSelected: Array<ProductPropertyItem>;
};

//NOTE: Projetions
export type Product = {
  id: string;
  name: string;
  article: string;
  price: number;
  inStock: number;
  description: string;
  about: string;
  slug: string;
  img: Array<string>;
};

export type ProductRelation = Product & {
  categoryList: Array<ProductCategory>;
  propertyItemListSelected: Array<ProductPropertyItem>;
};

// NOTE: Selector
export type ProductGetSelector = {
  id: string;
};

export type ProductGetByIdListSelector = {
  idList: Array<{ id: string }>;
};

// export type ProductGetBySelector = {
//   id: string;
// };

// export type ProductToCreate = {
//   name: string;
//   article: string;
//   price: number;
//   description: string;
//   about: string;
//   inStock: number;
//   slug: ProductSlug;
//   img: Array<string>;
// };
//
// export type ProductToUpdate = {
//   name: string;
//   article: string;
//   price: number;
//   description: string;
//   about: string;
//   inStock: number;
//   slug: ProductSlug;
//   img: Array<string>;
// };
//
// export type ProductAddCategoryList = {
//   productId: string;
//   categoryListId: Array<{ id: string }>;
// };
//
// export type ProductAddPropertyList = {
//   productId: string;
//   propertyListId: Array<{ id: string }>;
// };

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
