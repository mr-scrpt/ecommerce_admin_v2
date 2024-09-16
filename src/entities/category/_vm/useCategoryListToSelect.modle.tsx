import { useMemo } from "react";
import { useCategoryListQuery } from "../_query/useCategoryList.query";

export const useCategoryListToSelectModel = () => {
  const { categoryList, isPending } = useCategoryListQuery();

  const categoryListToSelect = useMemo(
    () =>
      categoryList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [categoryList],
  );

  return {
    categoryListToSelect,
    isPending,
  };
};
