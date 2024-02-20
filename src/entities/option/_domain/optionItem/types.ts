import { OptionId } from "../option/types";

// export const baseQueryKey = "option";
export type OptionItemId = string;

export type OptionItemEntity = {
  id: OptionId;
  name: string;
  value: string;
  createdAt: Date;
};

// Projetions

export type OptionItem = {
  id: OptionItemId;
  name: string;
  value: string;
};

export type OptionItemCombineCreate = {
  optionId: OptionId;
  name: string;
  value: string;
};

export type OptionItemToCreate = {
  name: string;
  value: string;
};

export type OptionItemToUpdate = {
  optionId: OptionId;
  id: OptionItemId;
  name: string;
  value: string;
};
