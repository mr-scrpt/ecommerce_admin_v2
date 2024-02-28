import { OptionItemToCreate, OptionToCreate } from "@/entities/property";

export type OptionCreateComplexible = {
  optionData: OptionToCreate;
  optionItemListData: OptionItemToCreate[];
};
