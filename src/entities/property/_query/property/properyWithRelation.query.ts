"use client";
import { PropertyRelation } from "../..";
import { propertyApi } from "../../_api/property.api";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

type QueryParams = {
  id: string;
};

export const usePropertyWithRelationQuery = (query: QueryParams) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    propertyApi.property.getWithRelation.useQuery<PropertyRelation>(query);

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    property: data,
    isFetchedAfterMount,
  };
};
