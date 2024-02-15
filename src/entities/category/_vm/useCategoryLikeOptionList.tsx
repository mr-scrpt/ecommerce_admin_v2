import { useCategoryListQuery } from "..";
import { useCategoryListTransformOption } from "./useCategoryListTransformOption";

export const useCategoryLikeOptionList = () => {
  const { categoryList, isPending } = useCategoryListQuery();
  const { toOptionList } = useCategoryListTransformOption();

  const optionList = toOptionList(categoryList);

  return {
    categoryOptionList: optionList,
    isPending,
  };
};
