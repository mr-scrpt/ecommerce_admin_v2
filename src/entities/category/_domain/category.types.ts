import {
  Category,
  CategoryEntity,
} from "@/kernel/domain/category/category.type";
import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";

// NOTE: Relations
export type CategoryRelation = Category & {
  productList: Array<CategoryProductListItem>;
  propertyList: Array<CategoryPropertyListItem>;
};

export type CategoryRelationEntity = CategoryEntity & {
  productList: Array<CategoryProductListItem>;
  propertyList: Array<CategoryPropertyListItem>;
};

// NOTE: Selector
export type CategoryGetSelector = {
  id?: string;
  slug?: string;
};

// NOTE: Side
type CategoryProductListItem = {
  id: string;
  name: string;
  slug: string;
  img: string[];
  createdAt: Date;
};

type CategoryPropertyListItem = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
};
