import { OptionItem } from "@/shared/ui/multiSelect";
import { OptionItemId } from "../_domain/optionItem/types";

type OptionItemOption = { id: OptionItemId; name: string };

export const useOptionListTransformOption = () => {
  return {
    toOptionList: (optionList: Array<OptionItemOption>) =>
      optionList.map((item) => ({
        value: item.id,
        label: item.name,
      })),

    toOptionIdList: (optionList: Array<OptionItem>) => {
      const res = optionList.map((item) => ({ id: item.value }));

      return res;
    },
  };
};
