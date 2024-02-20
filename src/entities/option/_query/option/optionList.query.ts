"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseQueryKey } from "../../_domain/option/types";
import { getOptionListAction } from "../../_action/option/getOptionList.action";
import { useListenOptionListUpdate } from "../../_vm/event/useListenOptionListUpdate";

export const getOptionListQuery = () => ({
  queryKey: [baseQueryKey, "getOptionList"],
  queryFn: () => getOptionListAction(),
});

export const useOptionListQuery = () => {
  const query = getOptionListQuery();
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenOptionListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    optionList: data ? data.optionList : [],
  };
};

export const useInvalidateOptionList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOptionList"],
    });
};
