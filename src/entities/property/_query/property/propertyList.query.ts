"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseQueryKey } from "../../_domain/property/types";
import { getPropertyListAction } from "../../_action/property/getPropertyList.action";
import { useListenPropertyListUpdate } from "../../_vm/event/useListenPropertyListUpdate";
import { propertyApi } from "../../_api/property.api";

export const usePropertyListQuery = () => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    propertyApi.property.getList.useQuery();

  useListenPropertyListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    propertyList: data ?? [],
  };
};

export const useInvalidatePropertyList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getPropertyList"],
    });
};
