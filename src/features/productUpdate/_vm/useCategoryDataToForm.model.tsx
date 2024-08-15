"use client";
import { useCategoryListToSelectModel } from "@/entities/category";
import { ProductFromForm, ProductRelation } from "@/entities/product";
import { useOptionListTransform } from "@/shared/lib/map";
import { useEffect, useState } from "react";

export const useCategoryDataToFormModel = (product?: ProductRelation) => {
  const [categoryOptionListSelected, setCategoryOptionListSelected] =
    useState<Array<{ label: string; value: string }>>();

  const [productWithActiveCategory, setProductWithActiveCategory] =
    useState<ProductRelation>();

  const [categoryOptionListActive, setCategoryOptionListActive] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const { toOptionList, toDataIdList } = useOptionListTransform();

  useEffect(() => {
    if (product?.categoryList) {
      setCategoryOptionListActive(toOptionList(product.categoryList));
    }
  }, [product, toOptionList]);

  useEffect(() => {
    if (categoryOptionListActive && product) {
      setProductWithActiveCategory({
        ...product,
        // categoryList: toDataIdList(categoryOptionListActive),
      });
    }
  }, [categoryOptionListActive, toDataIdList, product]);

  useEffect(() => {
    if (categoryOptionListSelected) {
      setCategoryOptionListActive(categoryOptionListSelected);
    }
  }, [categoryOptionListSelected]);

  const {
    categorySelectOptionList: categoryOptionListTotal,
    isPending: isPendingCategoryOptionList,
  } = useCategoryListToSelectModel();

  return {
    categoryOptionListTotal,
    productWithActiveCategory,
    isPendingCategoryOptionList,
    categoryOptionListSelected,
    setCategoryOptionListSelected,
    categoryOptionListActive,
    setCategoryOptionListActive,
  };
};
