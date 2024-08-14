"use client";
import { Property } from "@/kernel/domain/property/property.type";
import { propertyApi } from "../../_api/property.api";
import { useListenPropertyListUpdate } from "../../_vm/event/useListenPropertyListUpdate";

export const usePropertyListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    propertyApi.property.getList.useQuery<Array<Property>>();

  useListenPropertyListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    propertyList: data ?? [],
  };
};

export const useInvalidatePropertyList = () => {
  const invalidatePropertyList =
    propertyApi.useUtils().property.getList.invalidate;

  return () => invalidatePropertyList();
};
