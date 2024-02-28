"use client";
import { useEffect, useState } from "react";
import { useOptionWithRelationByCategoryQuery } from "../_query/option/optionListWithRelationByCategory.query";
import { useOptionListTransform } from "@/shared/lib/map";
import { OptionSelect } from "../_domain/option/types";

export const usePropertyListByCategoryIdList = (
  categoryIdListActive: Array<{ value: string; label: string }>,
  productOptionIdListActive: Array<{ id: string; name: string }>,
) => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const { toOptionListWithActive } = useOptionListTransform();

  useEffect(() => {
    if (!categoryIdListActive) return;
    setCategoryIdList(categoryIdListActive.map((item) => item.value));
  }, [categoryIdListActive, setCategoryIdList]);

  const { isPending, isSuccess, optionList, isFetchedAfterMount } =
    useOptionWithRelationByCategoryQuery(categoryIdList);

  const optionListCompleted: Array<OptionSelect> = optionList.map((option) => ({
    id: option.id,
    name: option.name,
    datatype: option.datatype,
    optionList: toOptionListWithActive(
      option.optionItemList,
      productOptionIdListActive,
    ),
  }));

  return {
    isPending,
    isSuccess,
    categoryOptionList: optionListCompleted,
    categoryIdList,
    isFetchedAfterMount,
    setCategoryIdList,
  };
};
