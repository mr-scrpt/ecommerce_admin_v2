import { OptionItem } from "@/shared/ui/multiSelect";
import { CategoryEntity } from "..";

export const useCategoryListTransformOption = () => {
  return {
    toOptionList: (categoryList: Array<CategoryEntity>) =>
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
