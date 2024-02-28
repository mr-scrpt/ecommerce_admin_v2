"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PropertyId, baseQueryKey } from "../../_domain/property/types";
import { getPropertyAction } from "../../_action/property/getProperty.action";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

export const getPropertyQuery = (propertyId: PropertyId) => ({
  queryKey: [baseQueryKey, "getProperty", propertyId],
  queryFn: () => getPropertyAction({ propertyId }),
});

export const usePropertyQuery = (propertyId: PropertyId) => {
  const query = getPropertyQuery(propertyId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
  console.log("output_log: in query =>>>", propertyId);

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    property: data?.property,
  };
};

export const useInvalidateProperty = () => {
  const queryClient = useQueryClient();

  return (propertyId: PropertyId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getProperty", propertyId],
    });
};
