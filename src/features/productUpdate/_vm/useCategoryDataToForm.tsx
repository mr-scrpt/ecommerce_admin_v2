"use client";
import { useCategoryLikeSelectOptionList } from "@/entities/category";
import { ProductRelation } from "@/entities/product";
import { useOptionListTransform } from "@/shared/lib/map";
import { useEffect, useRef, useState } from "react";

export const useCategoryDataToForm = (product?: ProductRelation) => {
  const [categoryIdListSelected, setCategoryIdListSelected] =
    useState<Array<{ label: string; value: string }>>();

  const [categoryOptionListActive, setCategoryOptionListActive] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const { toOptionList } = useOptionListTransform();

  useEffect(() => {
    if (product?.categoryList) {
      setCategoryOptionListActive(toOptionList(product.categoryList));
    }
  }, [product]);

  // const prevCategoryIdListSelected =
  //   useRef<Array<{ label: string; value: string }>>();
  //
  // useEffect(() => {
  //   if (
  //     categoryIdListSelected &&
  //     categoryIdListSelected !== prevCategoryIdListSelected.current
  //   ) {
  //     setCategoryOptionListActive(categoryIdListSelected);
  //     prevCategoryIdListSelected.current = categoryIdListSelected;
  //   }
  // }, [categoryIdListSelected]);

  useEffect(() => {
    if (categoryIdListSelected) {
      setCategoryOptionListActive(categoryIdListSelected);
    }
  }, [categoryIdListSelected]);

  const {
    categorySelectOptionList: categoryOptionListTotal,
    isPending: isPendingCategoryOptionList,
  } = useCategoryLikeSelectOptionList();

  return {
    categoryOptionListTotal,
    isPendingCategoryOptionList,
    categoryIdListSelected,
    setCategoryIdListSelected,
    categoryOptionListActive,
    setCategoryIdListComputed: setCategoryOptionListActive,
  };
};
