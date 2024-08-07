import {
  Category,
  CategoryEntity,
} from "@/kernel/domain/category/category.type";
import { Product, ProductEntity } from "@/kernel/domain/product/product.type";
import {
  Property,
  PropertyEntity,
} from "@/kernel/domain/property/property.type";

// NOTE: Relations
export type CategoryRelation = Category & {
  productList: Array<Product>;
  propertyList: Array<Property>;
};

export type CategoryRelationEntity = CategoryEntity & {
  productList: Array<ProductEntity>;
  propertyList: Array<PropertyEntity>;
};

// NOTE: Selector
// export type CategoryGetSelector = {
//   id?: string;
//   slug?: string;
// };
export type CategoryGetSelector = {
  id: string;
};
export type CategoryGetBySlugSelector = {
  slug: string;
};

// NOTE: Side
// type CategoryProductListItem = {
//   id: string;
//   name: string;
//   slug: string;
//   img: string[];
//   createdAt: Date;
// };
//
// type CategoryPropertyListItem = {
//   id: string;
//   name: string;
//   datatype: PropertyDataTypeEnum;
// };
