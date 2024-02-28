import { PropertyItemToCreate, PropertyToCreate } from "@/entities/property";

export type PropertyCreateComplexible = {
  propertyData: PropertyToCreate;
  propertyItemListData: PropertyItemToCreate[];
};
