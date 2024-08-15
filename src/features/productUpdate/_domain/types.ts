import { ProductUpdateDTO } from "@/kernel/domain/product/product.dto";
import { ProductBase } from "@/kernel/domain/product/product.type";
import { Property } from "@/kernel/domain/property/property.type";

type ProductUpdatePayload = Omit<ProductBase, "slug">;
type CategoryList = Array<{ categoryId: string }>;
type PropertyItemList = Array<{ propertyItemId: Property["id"] }>;

export type ProductUpdateTxPayload = {
  selector: ProductUpdateSelector;
  productData: ProductUpdatePayload;
  categoryData: CategoryList;
  propertyItemData: PropertyItemList;
};

export type ProductUpdateTxDTO = {
  selector: ProductUpdateSelector;
  productData: ProductUpdateDTO["data"];
  categoryData: CategoryList;
  propertyItemData: PropertyItemList;
};

// NOTE: Selector
export type ProductUpdateSelector = {
  id: string;
};
