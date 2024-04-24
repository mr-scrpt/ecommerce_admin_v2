import { useOptionListTransform } from "@/shared/lib/map";
import { useCategoryListQuery } from "../_query/categoryList.query";

export const useCategoryLikeSelectOptionList = () => {
  const { categoryList, isPending } = useCategoryListQuery();
  const { toOptionList } = useOptionListTransform();

  const optionListSelect = toOptionList(categoryList);

  return {
    categorySelectOptionList: optionListSelect,
    isPending,
  };
};
