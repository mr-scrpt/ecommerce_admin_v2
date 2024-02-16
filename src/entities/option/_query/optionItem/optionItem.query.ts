// "use client";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getOptionItemAction } from "../_action/getOptionItem.action";
// import { OptionItemId, baseQueryKey } from "../_domain/types";
// import { useListenOptionItemUpdate } from "../_vm/event/useListenOptionItemUpdate";
//
// export const getOptionItemQuery = (optionItemId: OptionItemId) => ({
//   queryKey: [baseQueryKey, "getOptionItem", optionItemId],
//   queryFn: () => getOptionItemAction({ optionItemId }),
// });
//
// export const useOptionItemQuery = (optionItemId: OptionItemId) => {
//   const query = getOptionItemQuery(optionItemId);
//   const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
//
//   useListenOptionItemUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     optionItem: data?.optionItem,
//   };
// };
//
// export const useInvalidateOptionItem = () => {
//   const queryClient = useQueryClient();
//
//   return (optionItemId: OptionItemId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getOptionItem", optionItemId],
//     });
// };
