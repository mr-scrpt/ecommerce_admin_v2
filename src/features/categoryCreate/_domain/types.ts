import { CategoryCreateDTO } from "@/entities/category";
import { Category } from "@/kernel/domain/category/category.type";
import { Property } from "@/kernel/domain/property/property.type";

type CategoryCreatePayload = Category;
type PropertyList = Array<{ propertyId: Property["id"] }>;

export type CategoryCreateTxPayload = {
  categoryData: CategoryCreatePayload;
  propertyData: PropertyList;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreateDTO["data"];
  propertyData: PropertyList;
};
