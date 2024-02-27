"use client";
import { useEffect, useState } from "react";
import { useOptionWithRelationByCategoryQuery } from "../_query/option/optionListWithRelationByCategory.query";
import { useOptionListTransform } from "@/shared/lib/map";
import { OptionSelect } from "../_domain/option/types";

export const useOptionListByCategoryIdList = (
  categoryIdListInit?: Array<{ value: string; label: string }>,
) => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const { toOptionList } = useOptionListTransform();

  useEffect(() => {
    if (!categoryIdListInit) return;
    setCategoryIdList(categoryIdListInit.map((item) => item.value));
  }, [categoryIdListInit, setCategoryIdList]);

  const { isPending, isSuccess, optionList, isFetchedAfterMount } =
    useOptionWithRelationByCategoryQuery(categoryIdList);

  const optionListCompleted: Array<OptionSelect> = optionList.map((option) => ({
    id: option.id,
    name: option.name,
    datatype: option.datatype,
    optionList: toOptionList(option.optionItemList),
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
