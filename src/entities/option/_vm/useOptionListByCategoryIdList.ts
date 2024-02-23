import { useState } from "react";
import { useOptionWithRelationByCategoryQuery } from "../_query/option/optionListWithRelationByCategory.query";
import { useOptionListTransform } from "@/shared/lib/map";

export const useOptionListByCategoryIdList = () => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const { toOptionList } = useOptionListTransform();

  const { isPending, isSuccess, optionList, isFetchedAfterMount } =
    useOptionWithRelationByCategoryQuery(categoryIdList);

  const optionListCompleted = optionList.map((option) => ({
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
