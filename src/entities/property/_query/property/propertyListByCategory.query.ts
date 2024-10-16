"use client";
import { propertyApi } from "../../_api/property.api";
import { PropertyRelation } from "../../_domain/property/property.types";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

export const usePropertyListByCategoryQuery = (categoryId: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount, isError, error } =
    propertyApi.property.getListByCategory.useQuery<Array<PropertyRelation>>({
      categoryId,
    });

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    propertyList: data ?? [],
    isError,
    error,
    isFetchedAfterMount,
  };
};

export const useInvalidatePropertyByCategory = () => {
  const invalidateProperty =
    propertyApi.useUtils().property.getListByCategory.invalidate;

  return (categoryId: string) => invalidateProperty({ categoryId });
};
