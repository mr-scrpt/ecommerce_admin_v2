"use client";
import { PropertyRelation } from "../..";
import { propertyApi } from "../../_api/property.api";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

type QueryParams = {
  categoryIdList: Array<{ categoryId: string }>;
};

export const usePropertyWithRelationByCategoryQuery = (query: QueryParams) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    propertyApi.property.getListWithRelationByCategoryList.useQuery<
      Array<PropertyRelation>
    >(query);

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    propertyList: data ?? [],
    isFetchedAfterMount,
  };
};

export const useInvalidatePropertyWithRelationByCategory = () => {
  const invalidateProperty =
    propertyApi.useUtils().property.getListWithRelationByCategoryList
      .invalidate;

  return (query: QueryParams) => invalidateProperty(query);
};
