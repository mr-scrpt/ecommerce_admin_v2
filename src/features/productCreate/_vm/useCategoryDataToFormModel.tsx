"use client";
import { useCategoryListToSelectModel } from "@/entities/category";
import { useEffect, useState } from "react";

export const useCategoryDataToFormModel = () => {
  const [categoryOptionListSelected, setCategoryOptionListSelected] =
    useState<Array<{ label: string; value: string }>>();

  const [categoryOptionListActive, setCategoryOptionListActive] = useState<
    Array<{ label: string; value: string }>
  >([]);

  // const { toOptionList } = useOptionListTransform();

  useEffect(() => {
    if (categoryOptionListSelected) {
      setCategoryOptionListActive(categoryOptionListSelected);
    }
  }, [categoryOptionListSelected]);

  const {
    categoryListToSelect: categoryOptionListTotal,
    isPending: isPendingCategoryOptionList,
  } = useCategoryListToSelectModel();

  return {
    categoryOptionListTotal,
    isPendingCategoryOptionList,
    categoryOptionListSelected,
    setCategoryOptionListSelected,
    categoryOptionListActive,
    setCategoryOptionListActive,
  };
};
