"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOptionWithRelationByCategoryAction } from "../../_action/option/getOptionWithRelationByCategory.action";
import { baseQueryKey } from "../../_domain/option/types";
import { useListenOptionUpdate } from "../../_vm/event/useListenOptionUpdate";

export const getOptionWithRelationByCategoryQuery = (
  categoryIdList: Array<string>,
) => ({
  queryKey: [baseQueryKey, "getOptionWithRelationByCategory", categoryIdList],
  queryFn: () =>
    getOptionWithRelationByCategoryAction({ categoryIdList: categoryIdList }),
});

export const useOptionWithRelationByCategoryQuery = (
  categoryIdList: Array<string>,
) => {
  const query = getOptionWithRelationByCategoryQuery(categoryIdList);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenOptionUpdate();

  return {
    isPending,
    isSuccess,
    optionList: data?.optionList ?? [],
    isFetchedAfterMount,
  };
};

export const useInvalidateOptionWithRelationByCategory = () => {
  const queryClient = useQueryClient();

  return (categoryIdList: Array<string>) =>
    queryClient.invalidateQueries({
      queryKey: [
        baseQueryKey,
        "getOptionWithRelationByCategory",
        categoryIdList,
      ],
    });
};
