// "use client";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getOptionItemListAction } from "../_action/getOptionItemList.action";
// import { baseQueryKey } from "../_domain/types";
// import { useListenOptionItemListUpdate } from "../_vm/event/useListenOptionItemListUpdate";
//
// export const getOptionItemListQuery = () => ({
//   queryKey: [baseQueryKey, "getOptionItemList"],
//   queryFn: () => getOptionItemListAction(),
// });
//
// export const useOptionItemListQuery = () => {
//   const query = getOptionItemListQuery();
//   const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
//
//   useListenOptionItemListUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     optionItemList: data ? data.optionItemList : [],
//   };
// };
//
// export const useInvalidateOptionItemList = () => {
//   const queryClient = useQueryClient();
//
//   return () =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getOptionItemList"],
//     });
// };
