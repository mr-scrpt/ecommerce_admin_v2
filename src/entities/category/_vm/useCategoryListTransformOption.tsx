import { OptionItem } from "@/shared/ui/multiSelect";
import { CategoryOption } from "../_domain/types";

export const useCategoryListTransformOption = () => {
  return {
    toOptionList: (categoryList: Array<CategoryOption>) =>
      categoryList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    toCategoryIdList: (optionList: Array<OptionItem>) => {
      console.log("output_log: option list =>>>", optionList);
      // const res = optionList.map((item) => ({ id: item.value }));
      const res = optionList.map((item) => ({ id: item.value }));

      console.log("output_log: option to cat Id =>>>", res);
      return res;
    },
  };
};
