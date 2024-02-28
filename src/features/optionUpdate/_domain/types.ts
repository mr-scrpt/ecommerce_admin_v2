import {
  OptionId,
  OptionItemToUpdate,
  OptionToUpdate,
} from "@/entities/property";

export type OptionUpdateComplexible = {
  optionId: OptionId;
  optionData: OptionToUpdate;
  optionItemListData: OptionItemToUpdate[];
};
