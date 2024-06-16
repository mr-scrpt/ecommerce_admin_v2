// export type ProductUpdateComplexible = {
//   productId: string;
//   productData: Partial<ProductToUpdate>;
//   categoryListId: Array<{ id: string }>;
//   propertyItemListSelected: Array<{ id: string }>;
//   // propertyItemListSelected;
//   // categoryList;
// };
//
import { ProductBase, ProductUpdateDTO } from "@/entities/product";
import { Property } from "@/entities/property";

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
