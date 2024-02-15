import { OptionItem } from "@/shared/ui/multiSelect";
import { useCategoryListQuery } from "..";

export const useCategoryLikeOptionList = () => {
  const { categoryList, isPending } = useCategoryListQuery();

  const optionList: Array<OptionItem> = categoryList.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return {
    categoryOptionList: optionList,
    isPending,
  };
};
