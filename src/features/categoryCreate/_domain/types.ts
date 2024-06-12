import { CategoryCreateDTO } from "@/entities/category";
import { Property } from "@/entities/property";

type PropertyList = Array<{ propertyId: Property["id"] }>;

export type CategoryCreateTxPayload = {
  categoryData: Omit<CategoryCreateDTO["data"], "slug">;
  propertyData: PropertyList;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreateDTO["data"];
  propertyData: PropertyList;
};
