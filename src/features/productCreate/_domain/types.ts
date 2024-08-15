import { ProductCreateDTO } from "@/kernel/domain/product/product.dto";
import { ProductBase } from "@/kernel/domain/product/product.type";
import { Property } from "@/kernel/domain/property/property.type";

type ProductCreatePayload = Omit<ProductBase, "slug">;
type CategoryList = Array<{ categoryId: string }>;
type PropertyItemList = Array<{ propertyItemId: Property["id"] }>;

export type ProductCreateTxPayload = {
  productData: ProductCreatePayload;
  categoryData: CategoryList;
  propertyItemData: PropertyItemList;
};

export type ProductCreateTxDTO = {
  productData: ProductCreateDTO["data"];
  categoryData: CategoryList;
  propertyItemData: PropertyItemList;
};
