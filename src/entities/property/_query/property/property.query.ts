"use client";
import { Property } from "@/kernel/domain/property/property.type";
import { propertyApi } from "../../_api/property.api";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

export const usePropertyQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    propertyApi.property.get.useQuery<Property>({ id });

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    property: data ?? null,
  };
};

export const useInvalidateProperty = () => {
  const invalidateProperty = propertyApi.useUtils().property.get.invalidate;
  return (id: string) => invalidateProperty({ id });
};
