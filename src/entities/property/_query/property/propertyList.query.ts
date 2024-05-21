// "use client";
// import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
// import { baseQueryKey } from "../../_domain/property/types";
// import { getPropertyListAction } from "../../_action/property/getPropertyList.action";
// import { useListenPropertyListUpdate } from "../../_vm/event/useListenPropertyListUpdate";
//
// export const getPropertyListQuery = () =>
//   queryOptions({
//     queryKey: [baseQueryKey, "getPropertyList"],
//     queryFn: () => getPropertyListAction(),
//   });
//
// export const usePropertyListQuery = () => {
//   const query = getPropertyListQuery();
//   const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
//
//   useListenPropertyListUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     propertyList: data ? data.propertyList : [],
//   };
// };
//
// export const useInvalidatePropertyList = () => {
//   const queryClient = useQueryClient();
//
//   return () =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getPropertyList"],
//     });
// };
