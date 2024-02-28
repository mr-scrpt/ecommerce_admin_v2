import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { PropertyDataTypeEnum } from "../../../../shared/type/propertyDataType.enum";
import { OptionItem } from "../optionItem/types";

export const baseQueryKey = "option";
export type OptionId = string;

export type OptionEntity = {
  id: OptionId;
  name: string;
  datatype: PropertyDataTypeEnum;
  createdAt: Date;
};

export type OptionRelationEntity = OptionEntity & {
  categoryList: Array<OptionCategory>;
  optionItemList: Array<OptionItem>;
};

// Projetions

export type Option = {
  id: OptionId;
  name: string;
  datatype: PropertyDataTypeEnum;
  createdAt: Date;
};

export type OptionRelation = Option & {
  categoryList: Array<OptionCategory>;
  optionItemList: Array<OptionItem>;
};

export type OptionToCreate = {
  name: string;
  datatype: PropertyDataTypeEnum;
  isFilter: boolean;
};

export type OptionToUpdate = {
  id: OptionId;
  name: string;
  datatype: PropertyDataTypeEnum;
};

//Side
export type OptionCategory = {
  id: string;
  name: string;
};

// UI
export type OptionSelect = {
  id: string;
  name: string;
  datatype: PropertyDataTypeEnum;
  // optionList: Array<MultiSelectOptionItem & { active: boolean }>;
  optionList: Array<MultiSelectOptionItem>;
};
