"use client";
import { useQuery } from "@tanstack/react-query";
import { getOptionWithRelationAction } from "../../_action/option/getOptionWithRelation.action";
import { OptionId, baseQueryKey } from "../../_domain/option/types";
import { useListenOptionUpdate } from "../../_vm/event/useListenOptionUpdate";

export const getOptionWithRelationQuery = (optionId: OptionId) => ({
  queryKey: [baseQueryKey, "getOption", optionId],
  queryFn: () => getOptionWithRelationAction({ optionId }),
});

export const useOptionWithRelationQuery = (optionId: OptionId) => {
  const query = getOptionWithRelationQuery(optionId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenOptionUpdate();

  return {
    isPending,
    isSuccess,
    option: data?.option,
    isFetchedAfterMount,
  };
};

// export const useInvalidateOptionWithRelation = () => {
//   const queryClient = useQueryClient();
//
//   return (optionId: OptionId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getOptionWithRelation", optionId],
//     });
// };
