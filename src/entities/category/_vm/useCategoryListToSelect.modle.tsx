import { useOptionListTransform } from "@/shared/lib/map";
import { useCategoryListQuery } from "../_query/useCategoryList.query";

export const useCategoryListToSelectModel = () => {
  const { categoryList, isPending } = useCategoryListQuery();
  const { toOptionList } = useOptionListTransform();

  const optionListSelect = toOptionList(categoryList);

  return {
    categoryListToSelect: optionListSelect,
    isPending,
  };
};
