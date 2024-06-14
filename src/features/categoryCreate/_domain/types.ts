import { CategoryBase, CategoryCreateDTO } from "@/entities/category";
import { Property } from "@/entities/property";

type CategoryCreatePayload = CategoryBase;
type PropertyList = Array<{ propertyId: Property["id"] }>;

export type CategoryCreateTxPayload = {
  categoryData: CategoryCreatePayload;
  propertyData: PropertyList;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreateDTO["data"];
  propertyData: PropertyList;
};
