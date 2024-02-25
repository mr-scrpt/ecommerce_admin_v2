import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";
import { OptionDataTypeEnum } from "../../../../shared/type/optionDataType.enum";
import { OptionItem } from "../optionItem/types";

export const baseQueryKey = "option";
export type OptionId = string;

export type OptionEntity = {
  id: OptionId;
  name: string;
  datatype: OptionDataTypeEnum;
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
  datatype: OptionDataTypeEnum;
  createdAt: Date;
};

export type OptionRelation = Option & {
  categoryList: Array<OptionCategory>;
  optionItemList: Array<OptionItem>;
};

export type OptionToCreate = {
  name: string;
  datatype: OptionDataTypeEnum;
  isFilter: boolean;
};

export type OptionToUpdate = {
  id: OptionId;
  name: string;
  datatype: OptionDataTypeEnum;
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
  datatype: OptionDataTypeEnum;
  // optionList: Array<MultiSelectOptionItem & { active: boolean }>;
  optionList: Array<MultiSelectOptionItem>;
};
