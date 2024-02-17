import { OptionDataTypeEnum } from "../../../shared/type/optionDataType.enum";

export const baseQueryKey = "option";
export type OptionId = string;
export type OptionSlug = string;

export type OptionCategory = {
  id: string;
  name: string;
};

export type OptionEntity = {
  id: OptionId;
  name: string;
  datatype: OptionDataTypeEnum;
  createdAt: Date;
};

export type OptionRelationEntity = OptionEntity & {
  categoryList: Array<OptionCategory>;
  optionItemList: Array<OptionItemOption>;
};

export type OptionOption = {
  id: OptionId;
  name: string;
};

export type OptionItemEntity = {
  id: OptionId;
  name: string;
  slug: OptionSlug;
  board: Array<string>;
  createdAt: Date;
};

export type OptionItemOption = {
  id: OptionId;
  name: string;
};
// Projetions

export type Option = {
  name: string;
  datatype: OptionDataTypeEnum;
};
export type OptionItem = {
  name: string;
  slug: OptionSlug;
  board: Array<string>;
  // createdAt: Date;
};
