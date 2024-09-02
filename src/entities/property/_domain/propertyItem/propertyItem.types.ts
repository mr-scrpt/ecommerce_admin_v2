import { Product } from "@/kernel/domain/product/product.type";
import { Property } from "@/kernel/domain/property/property.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";

// NOTE: Relations
export type PropertyItemRelation = PropertyItem & {
  propertyId: Property["id"];
  productList: Array<Product>;
};

// NOTE: Selector
export type PropertyItemGetSelector = {
  id: string;
};

export type PropertyItemGetByPropertySelector = {
  propertyId: string;
};
