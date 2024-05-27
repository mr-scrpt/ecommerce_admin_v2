import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";

// NOTE: Entity
export type CategoryEntity = {
  id: string;
  name: string;
  slug: string;
  board: Array<string>;
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
  categoryId?: string;
  categorySlug?: string;
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
