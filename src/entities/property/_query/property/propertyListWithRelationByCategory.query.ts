"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPropertyWithRelationByCategoryAction } from "../../_action/property/getPropertyWithRelationByCategory.action";
import { baseQueryKey } from "../../_domain/property/types";
import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";

export const getPropertyWithRelationByCategoryQuery = (
  categoryIdList: Array<string>,
) =>
  queryOptions({
    queryKey: [
      baseQueryKey,
      "getPropertyWithRelationByCategory",
      categoryIdList,
    ],
    queryFn: () =>
      getPropertyWithRelationByCategoryAction({
        categoryIdList: categoryIdList,
      }),
  });

export const usePropertyWithRelationByCategoryQuery = (
  categoryIdList: Array<string>,
) => {
  const query = getPropertyWithRelationByCategoryQuery(categoryIdList);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenPropertyUpdate();

  return {
    isPending,
    isSuccess,
    propertyList: data?.propertyList ?? [],
    isFetchedAfterMount,
  };
};

export const useInvalidatePropertyWithRelationByCategory = () => {
  const queryClient = useQueryClient();

  return (categoryIdList: Array<string>) =>
    queryClient.invalidateQueries({
      queryKey: [
        baseQueryKey,
        "getPropertyWithRelationByCategory",
        categoryIdList,
      ],
    });
};
