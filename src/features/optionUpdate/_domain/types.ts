import {
  OptionId,
  OptionItemToUpdate,
  OptionToUpdate,
} from "@/entities/option";

export type OptionUpdateComplexible = {
  optionId: OptionId;
  optionData: OptionToUpdate;
  optionItemListData: OptionItemToUpdate[];
};
