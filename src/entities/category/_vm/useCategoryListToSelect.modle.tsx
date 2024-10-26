import { buildCategoryOptionsArray } from "@/kernel/domain/category/form.schema";
import { useCategoryListQuery } from "../_query/useCategoryList.query";

export const useCategoryListToSelectModel = () => {
  const { categoryList, isPending, isSuccess, isError } =
    useCategoryListQuery();

  const categoryListToSelect = buildCategoryOptionsArray(categoryList);
  return {
    isPending,
    isSuccess,
    isError,
    categoryListToSelect,
  };
};
