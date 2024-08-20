"use client";
import { PropertyItem } from "@/kernel/domain/property/propertyItem.type";
import { propertyItemApi } from "../../_api/propertyItem.api";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

export const usePropertyItemListByPropertyQuery = (propertyId: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    propertyItemApi.propertyItem.getListByProperty.useQuery<
      Array<PropertyItem>
    >({
      propertyId,
    });

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    propertyItemList: data ?? [],
    isFetchedAfterMount,
  };
};

export const useInvalidatePropertyItemByProperty = () => {
  const invalidatePropertyItem =
    propertyItemApi.useUtils().propertyItem.getListByProperty.invalidate;

  return (propertyId: string) => invalidatePropertyItem({ propertyId });
};
