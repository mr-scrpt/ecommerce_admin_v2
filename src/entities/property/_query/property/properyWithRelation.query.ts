"use client";
import { propertyApi } from "../../_api/property.api";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

type QueryParams = {
  id: string;
};

export const usePropertyWithRelationQuery = (query: QueryParams) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    propertyApi.property.getWithRelation.useQuery(query);

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    property: data,
    isFetchedAfterMount,
  };
};
