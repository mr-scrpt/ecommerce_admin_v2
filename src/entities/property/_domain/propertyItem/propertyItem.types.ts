import { Product } from "@/kernel/domain/product/product.type";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";
import { Property } from "@prisma/client";

// NOTE: Relations
export type PropertyItemRelation = PropertyItem & {
  propertyId: Property["id"];
  productList: Array<Product>;
};

// NOTE: Selector
export type PropertyItemGetSelector = {
  id: string;
};
