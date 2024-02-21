"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OptionId, baseQueryKey } from "../../_domain/option/types";
import { getOptionAction } from "../../_action/option/getOption.action";
import { useListenOptionUpdate } from "../../_vm/event/useListenOptionUpdate";

export const getOptionQuery = (optionId: OptionId) => ({
  queryKey: [baseQueryKey, "getOption", optionId],
  queryFn: () => getOptionAction({ optionId }),
});

export const useOptionQuery = (optionId: OptionId) => {
  const query = getOptionQuery(optionId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
  console.log("output_log: in query =>>>", optionId);

  useListenOptionUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    option: data?.option,
  };
};

export const useInvalidateOption = () => {
  const queryClient = useQueryClient();

  return (optionId: OptionId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getOption", optionId],
    });
};
