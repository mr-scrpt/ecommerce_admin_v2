import { useCategoryListQuery } from "..";
import { useCategoryListTransformOption } from "./useCategoryListTransformOption";

export const useCategoryLikeSelectOptionList = () => {
  const { categoryList, isPending } = useCategoryListQuery();
  const { toOptionList } = useCategoryListTransformOption();

  const optionListSelect = toOptionList(categoryList);

  return {
    categorySelectOptionList: optionListSelect,
    isPending,
  };
};
