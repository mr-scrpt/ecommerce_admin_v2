import { CategoryBase, CategoryCreateDTO } from "@/entities/category";
import { Property } from "@/entities/property";

type PropertyList = Array<{ propertyId: Property["id"] }>;

export type CategoryCreateTxPayload = {
  categoryData: CategoryCreatePayload;
  propertyData: PropertyList;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreateDTO;
  propertyData: PropertyList;
};

// NOTE: Payload
export type CategoryCreatePayload = Omit<CategoryBase, "slug">;
