import { CategoryUpdateDTO, CategoryUpdatePayload } from "@/entities/category";
import { Property } from "@/entities/property";

type PropertyList = Array<Pick<Property, "id">>;

export type CategoryUpdateTxPayload = {
  categoryData: CategoryUpdatePayload;
  propertyData: PropertyList;
};

export type CategoryUpdateTxDTO = {
  categoryData: CategoryUpdateDTO;
  propertyData: PropertyList;
};
