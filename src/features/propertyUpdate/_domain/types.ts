import {
  PropertyId,
  PropertyItemToUpdate,
  PropertyToUpdate,
} from "@/entities/property";

export type PropertyUpdateComplexible = {
  propertyId: PropertyId;
  propertyData: PropertyToUpdate;
  propertyItemListData: PropertyItemToUpdate[];
};
