import { PropertyDataTypeEnum } from "@/kernel/domain/property.enum";

// NOTE: Base
export type CategoryBase = {
  name: string;
  slug: string;
  board: Array<string>;
};

// NOTE: Entity
export type CategoryEntity = CategoryBase & {
  id: string;
  createdAt: Date;
};

export type CategoryRelationEntity = CategoryEntity & {
  productList: Array<ProductListItem>;
  propertyList: Array<PropertyListItem>;
};

// NOTE: Projetions
export type Category = {
  id: string;
  name: string;
  slug: string;
  board: Array<string>;
  createdAt: Date;
};

export type CategoryRelation = Category & {
  productList: Array<ProductListItem>;
  propertyList: Array<PropertyListItem>;
};

// NOTE: Payload
export type CategoryGetPayload = {
  id?: string;
  slug?: string;
};

export type CategoryCreatePayload = CategoryBase;

export type CategoryUpdatePayload = Partial<CategoryBase> & {
  id: string;
};

// NOTE: Side
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
  datatype: PropertyDataTypeEnum;
};
