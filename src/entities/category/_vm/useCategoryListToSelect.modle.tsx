import { buildCategoryOptionsArray } from "@/kernel/domain/category/form.schema";
import { useCategoryListQuery } from "../_query/useCategoryList.query";

export const useCategoryListToSelectModel = () => {
  const { categoryList, isPending } = useCategoryListQuery();

  const categoryListToSelect = buildCategoryOptionsArray(categoryList);
  return {
    categoryListToSelect,
    isPending,
  };
};
