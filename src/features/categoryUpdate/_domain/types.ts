import { CategoryUpdateDTO, CategoryUpdatePayload } from "@/entities/category";
import { Property } from "@/entities/property";

type CategoryPropertyList = Array<Pick<Property, "id">>;

export type CategoryUpdateTxPayload = {
  categoryData: CategoryUpdatePayload;
  propertyData: CategoryPropertyList;
};

export type CategoryUpdateTxDTO = {
  categoryData: CategoryUpdateDTO;
  propertyData: CategoryPropertyList;
};
