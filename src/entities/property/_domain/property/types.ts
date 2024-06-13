import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { PropertyDataTypeEnum } from "../../../../kernel/domain/property.type";
import { PropertyItem } from "../propertyItem/types";

// NOTE: Base
export type PropertyBase = {
  name: string;
  datatype: PropertyDataTypeEnum;
};

// NOTE: Entity
export type PropertyEntity = PropertyBase & {
  id: string;
  createdAt: Date;
};

export type PropertyRelationEntity = PropertyEntity & {
  categoryList: Array<PropertyCategory>;
  propertyItemList: Array<PropertyItem>;
};

// NOTE: Projetions
export type Property = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  createdAt: Date;
};

export type PropertyRelation = Property & {
  categoryList: Array<PropertyCategory>;
  propertyItemList: Array<PropertyItem>;
};

// NOTE: Selector
export type PropertyGetSelector = {
  id: string;
};

export type PropertyListGetByCategoryListSelector = {
  categoryIdList: Array<{ categoryId: string }>;
};

// export type PropertyToCreate = {
//   name: string;
//   datatype: PropertyDataTypeEnum;
// };
//
// export type PropertyToUpdate = {
//   id: string;
//   name: string;
//   datatype: PropertyDataTypeEnum;
// };

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
