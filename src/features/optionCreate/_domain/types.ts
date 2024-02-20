import { OptionItemToCreate, OptionToCreate } from "@/entities/option";

export type OptionCreateComplexible = {
  optionData: OptionToCreate;
  optionItemListData: OptionItemToCreate[];
};
