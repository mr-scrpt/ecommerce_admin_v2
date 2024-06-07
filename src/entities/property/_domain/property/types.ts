import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { PropertyDataTypeEnum } from "../../../../kernel/domain/property.type";
import { PropertyItem } from "../propertyItem/types";

export const baseQueryKey = "property";
export type PropertyId = string;

export type PropertyEntity = {
  id: PropertyId;
  name: string;
  datatype: PropertyDataTypeEnum;
  createdAt: Date;
};

export type PropertyRelationEntity = PropertyEntity & {
  categoryList: Array<PropertyCategory>;
  propertyItemList: Array<PropertyItem>;
};

// Projetions

export type Property = {
  id: PropertyId;
  name: string;
  datatype: PropertyDataTypeEnum;
  createdAt: Date;
};

export type PropertyRelation = Property & {
  categoryList: Array<PropertyCategory>;
  propertyItemList: Array<PropertyItem>;
};

export type PropertyToCreate = {
  name: string;
  datatype: PropertyDataTypeEnum;
  // isFilter: boolean;
};

export type PropertyToUpdate = {
  id: PropertyId;
  name: string;
  datatype: PropertyDataTypeEnum;
};

//Side
export type PropertyCategory = {
  id: string;
  name: string;
};

// UI
export type PropertyToSelect = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  // propertyList: Array<MultiSelectPropertyItem & { active: boolean }>;
  propertyList: Array<MultiSelectOptionItem>;
};
