import { OptionItem } from "@/shared/ui/multiSelect";
import { OptionOption } from "../_domain/types";

export const useOptionListTransformOption = () => {
  return {
    toOptionList: (optionList: Array<OptionOption>) =>
      optionList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    toOptionIdList: (optionList: Array<OptionItem>) => {
      console.log("output_log: option list =>>>", optionList);
      // const res = optionList.map((item) => ({ id: item.value }));
      const res = optionList.map((item) => ({ id: item.value }));

      console.log("output_log: option to cat Id =>>>", res);
      return res;
    },
  };
};
