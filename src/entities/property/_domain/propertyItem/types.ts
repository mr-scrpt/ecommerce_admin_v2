import { PropertyId } from "../property/types";

// export const baseQueryKey = "property";
export type PropertyItemId = string;

export type PropertyItemEntity = {
  id: PropertyId;
  name: string;
  value: string;
  createdAt: Date;
};

// Projetions

export type PropertyItem = {
  id: PropertyItemId;
  name: string;
  value: string;
};

export type PropertyItemRelation = {
  id: PropertyItemId;
  name: string;
  value: string;
};

export type PropertyItemCombineCreate = {
  propertyId: PropertyId;
  name: string;
  value: string;
};

export type PropertyItemCombineUpdateOrCreate = {
  propertyId: PropertyId;
  id?: PropertyItemId;
  name: string;
  value: string;
};

export type PropertyItemToCreate = {
  name: string;
  value: string;
};

export type PropertyItemToUpdate = {
  // propertyId: PropertyId;
  id?: PropertyItemId;
  name: string;
  value: string;
};
