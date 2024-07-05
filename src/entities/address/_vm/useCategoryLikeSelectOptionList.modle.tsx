import { useOptionListTransform } from "@/shared/lib/map";
import { useCategoryListQuery } from "../_query/addressListByUser.query";

export const useCategoryListToSelectModel = () => {
  const { categoryList, isPending } = useCategoryListQuery();
  const { toOptionList } = useOptionListTransform();

  const optionListSelect = toOptionList(categoryList);

  return {
    categorySelectOptionList: optionListSelect,
    isPending,
  };
};
