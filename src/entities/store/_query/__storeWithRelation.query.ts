// "use client";
// import { queryOptions, useQuery } from "@tanstack/react-query";
// import { getStoreWithRelationAction } from "../_action/__getStoreWithRelation.action";
// import { StoreId, baseQueryKey } from "../_domain/types";
// import { useListenStoreUpdate } from "../_vm/event/useListenStoreUpdate";
//
// export const getStoreWithRelationQuery = (storeId: StoreId) =>
//   queryOptions({
//     queryKey: [baseQueryKey, "getStore", storeId],
//     queryFn: () => getStoreWithRelationAction({ storeId }),
//   });
//
// export const useStoreWithRelationQuery = (storeId: StoreId) => {
//   const query = getStoreWithRelationQuery(storeId);
//   const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);
//
//   useListenStoreUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     store: data?.store,
//   };
// };

// export const useInvalidateStoreWithRelation = () => {
//   const queryClient = useQueryClient();
//
//   return (storeId: StoreId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getStore", storeId],
//     });
// };
