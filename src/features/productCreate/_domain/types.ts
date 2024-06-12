import { ProductCreateDTO } from "@/entities/product";
import { Property } from "@/entities/property";

// export type ProductCreateComplexible = {
//   productData: ProductToCreate;
//   categoryListData: Array<{ id: string }>;
//   propertyItemListSelected: Array<{ id: string }>;
// };

type PropertyItemList = Array<{ propertyItemId: Property["id"] }>;
type CategoryList = Array<{ categoryId: string }>;

export type ProductCreateTxPayload = {
  productData: Omit<ProductCreateDTO["data"], "slug">;
  categoryData: CategoryList;
  propertyItemData: PropertyItemList;
};

export type ProductCreateTxDTO = {
  productData: ProductCreateDTO["data"];
  categoryData: CategoryList;
  propertyItemData: PropertyItemList;
};
