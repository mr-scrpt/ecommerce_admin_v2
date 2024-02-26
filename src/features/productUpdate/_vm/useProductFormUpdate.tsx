"use client";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { ProductRelation } from "@/entities/product";
import { useOptionListTransform } from "@/shared/lib/map";
import { useEffect, useRef, useState } from "react";

export const useCategoryDataToForm = (product?: ProductRelation) => {
  const [categoryIdListSelected, setCategoryIdListSelected] =
    useState<Array<{ label: string; value: string }>>();

  const [categoryIdListComputed, setCategoryIdListComputed] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const { toOptionList } = useOptionListTransform();

  useEffect(() => {
    if (product?.categoryList) {
      setCategoryIdListComputed(toOptionList(product.categoryList));
    }
  }, [product]);

  const prevCategoryIdListSelected =
    useRef<Array<{ label: string; value: string }>>();

  useEffect(() => {
    if (
      categoryIdListSelected &&
      categoryIdListSelected !== prevCategoryIdListSelected.current
    ) {
      setCategoryIdListComputed(categoryIdListSelected);
      prevCategoryIdListSelected.current = categoryIdListSelected;
    }
  }, [categoryIdListSelected]);

  const { categorySelectOptionList, isPending: isPendingCategoryOptionList } =
    useCategoryLikeSelectOptionList();

  return {
    categorySelectOptionList,
    isPendingCategoryOptionList,
    categoryIdListSelected,
    setCategoryIdListSelected,
    categoryIdListComputed,
    setCategoryIdListComputed,
  };
};
