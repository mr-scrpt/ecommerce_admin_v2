"use client";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { ProductRelation } from "@/entities/product";
import { useOptionListTransform } from "@/shared/lib/map";
import { useEffect, useState } from "react";

export const useCategoryDataToForm = () => {
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
    categorySelectOptionList: categoryOptionListTotal,
    isPending: isPendingCategoryOptionList,
  } = useCategoryLikeSelectOptionList();

  return {
    categoryOptionListTotal,
    isPendingCategoryOptionList,
    categoryOptionListSelected,
    setCategoryOptionListSelected,
    categoryOptionListActive,
    setCategoryOptionListActive,
  };
};
