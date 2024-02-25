"use client";
import { useState } from "react";
import { useOptionWithRelationByCategoryQuery } from "../_query/option/optionListWithRelationByCategory.query";
import { useOptionListTransform } from "@/shared/lib/map";
import { OptionSelect } from "../_domain/option/types";

export const useOptionListByCategoryIdList = () => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  console.log("output_log: categoryIdList =>>>", categoryIdList);
  const { toOptionList } = useOptionListTransform();

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
    optionList: optionListCompleted,
    isFetchedAfterMount,
    setCategoryIdList,
  };
};
