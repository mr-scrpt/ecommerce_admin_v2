import { useOptionListTransform } from "@/shared/lib/map";
import { useCategoryListQuery } from "..";

export const useCategoryLikeSelectOptionList = () => {
  const { categoryList, isPending } = useCategoryListQuery();
  const { toOptionList } = useOptionListTransform();

  const optionListSelect = toOptionList(categoryList);

  return {
    categorySelectOptionList: optionListSelect,
    isPending,
  };
};
