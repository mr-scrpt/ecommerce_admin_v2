import { CategoryCreateDTO, CategoryCreatePayload } from "@/entities/category";
import { Property } from "@/entities/property";

type PropertyList = Array<Pick<Property, "id">>;

export type CategoryCreateTxPayload = {
  categoryData: Omit<CategoryCreatePayload, "slug">;
  propertyData: PropertyList;
};

export type CategoryCreateTxDTO = {
  categoryData: CategoryCreateDTO;
  propertyData: Array<{ id: string }>;
};
