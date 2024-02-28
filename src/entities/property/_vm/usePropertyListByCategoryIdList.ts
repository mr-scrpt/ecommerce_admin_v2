"use client";
import { useEffect, useState } from "react";
import { usePropertyWithRelationByCategoryQuery } from "../_query/property/propertyListWithRelationByCategory.query";
import { useOptionListTransform } from "@/shared/lib/map";
import { PropertyToSelect } from "../_domain/property/types";

export const usePropertyListByCategoryIdList = (
  categoryIdListActive: Array<{ value: string; label: string }>,
  productPropertyIdListActive: Array<{ id: string; name: string }>,
) => {
  const [categoryIdList, setCategoryIdList] = useState<string[]>([]);
  const { toOptionListWithActive } = useOptionListTransform();

  useEffect(() => {
    if (!categoryIdListActive) return;
    setCategoryIdList(categoryIdListActive.map((item) => item.value));
  }, [categoryIdListActive, setCategoryIdList]);

  const { isPending, isSuccess, propertyList, isFetchedAfterMount } =
    usePropertyWithRelationByCategoryQuery(categoryIdList);

  const propertyListCompleted: Array<PropertyToSelect> = propertyList.map(
    (property) => ({
      id: property.id,
      name: property.name,
      datatype: property.datatype,
      propertyList: toOptionListWithActive(
        property.propertyItemList,
        productPropertyIdListActive,
      ),
    }),
  );

  return {
    isPending,
    isSuccess,
    propertyList: propertyListCompleted,
    categoryIdList,
    isFetchedAfterMount,
    setCategoryIdList,
  };
};
