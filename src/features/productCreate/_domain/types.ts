import { ProductBase, ProductCreateDTO } from "@/entities/product";
import { Property } from "@/entities/property";

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
