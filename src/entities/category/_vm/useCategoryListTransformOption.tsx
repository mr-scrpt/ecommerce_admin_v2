import { OptionItem } from "@/shared/ui/multiSelect";
import { CategoryId } from "../_domain/types";

type CategotyOptionItem = { id: CategoryId; name: string };

export const useCategoryListTransformOption = () => {
  return {
    toOptionList: (categoryList: Array<CategotyOptionItem>) =>
      categoryList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    toCategoryIdList: (optionList: Array<OptionItem>) => {
      const res = optionList.map((item) => ({ id: item.value }));

      return res;
    },
  };
};
