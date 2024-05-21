// "use client";
// import { queryOptions, useQuery } from "@tanstack/react-query";
// import { getPropertyWithRelationAction } from "../../_action/property/getPropertyWithRelation.action";
// import { PropertyId, baseQueryKey } from "../../_domain/property/types";
// import { useListenPropertyUpdate } from "../../_vm/event/useListenPropertyUpdate";
//
// export const getPropertyWithRelationQuery = (propertyId: PropertyId) =>
//   queryOptions({
//     queryKey: [baseQueryKey, "getProperty", propertyId],
//     queryFn: () => getPropertyWithRelationAction({ propertyId }),
//   });
//
// export const usePropertyWithRelationQuery = (propertyId: PropertyId) => {
//   const query = getPropertyWithRelationQuery(propertyId);
//
//   const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);
//
//   useListenPropertyUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     property: data?.property,
//     isFetchedAfterMount,
//   };
// };
//
// // export const useInvalidatePropertyWithRelation = () => {
// //   const queryClient = useQueryClient();
// //
// //   return (propertyId: PropertyId) =>
// //     queryClient.invalidateQueries({
// //       queryKey: [baseQueryKey, "getPropertyWithRelation", propertyId],
// //     });
// // };
