"use client";
import { Property } from "@/kernel/domain/property/property.type";
import { propertyApi } from "../../_api/property.api";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

type QueryParams = {
  id: string;
};

export const usePropertyQuery = (query: QueryParams) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    propertyApi.property.get.useQuery<Property>(query);

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    property: data,
  };
};

export const useInvalidateProperty = () => {
  const invalidateProperty = propertyApi.useUtils().property.get.invalidate;
  return (query: QueryParams) => invalidateProperty(query);
};
