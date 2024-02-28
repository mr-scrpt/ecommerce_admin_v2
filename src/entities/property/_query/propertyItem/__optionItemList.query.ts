// "use client";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getPropertyItemListAction } from "../_action/getPropertyItemList.action";
// import { baseQueryKey } from "../_domain/types";
// import { useListenPropertyItemListUpdate } from "../_vm/event/useListenPropertyItemListUpdate";
//
// export const getPropertyItemListQuery = () => ({
//   queryKey: [baseQueryKey, "getPropertyItemList"],
//   queryFn: () => getPropertyItemListAction(),
// });
//
// export const usePropertyItemListQuery = () => {
//   const query = getPropertyItemListQuery();
//   const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
//
//   useListenPropertyItemListUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     propertyItemList: data ? data.propertyItemList : [],
//   };
// };
//
// export const useInvalidatePropertyItemList = () => {
//   const queryClient = useQueryClient();
//
//   return () =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getPropertyItemList"],
//     });
// };
