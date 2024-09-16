import { Category } from "@/kernel/domain/category/category.type";
import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";
import { Product, ProductEntity } from "@/kernel/domain/product/product.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";
import { PROPERTY_DATATYPE } from "@prisma/client";

// NOTE: Relations
export type ProductRelationEntity = ProductEntity & {
  categoryList: Array<Category>;
  propertyItemListSelected: Array<PropertyItem>;
};

export type ProductRelation = Product & {
  categoryList: Array<Category>;
  propertyItemListSelected: Array<PropertyItem>;
};

// NOTE: Selector
export type ProductGetSelector = {
  id: string;
};

export type ProductSearchSelector = {
  q: string;
};

export type ProductGetByIdListSelector = {
  idList: Array<{ id: string }>;
};

// NOTE: Side
// export type ProductCategory = {
//   id: string;
//   name: string;
// };

// export type ProductPropertyItem = {
//   id: string;
//   name: string;
//   value: string;
//   propertyId: string;
// };

export type ProductPropertyObjectList = {
  [key: string]: string | string[];
};

// NOTE: UI
export type ProductFromForm = {
  name: string;
  article: string;
  price: number;
  description: string;
  about: string;
  inStock: number;
  img: Array<string>;
  categoryList: Array<{ id: string }>;
  propertyItemListSelected: Array<{ id: string }>;
  // categoryList: Array<Category>;
  // propertyItemListSelected: Array<PropertyItem>;
};

// TODO: Needed?
export type ProductPropertyToSelect = {
  id: string;
  name: string;
  datatype: PROPERTY_DATATYPE;
  propertyList: Array<ProductDefaultSelectOption>;
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
